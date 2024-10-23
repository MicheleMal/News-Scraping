import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import puppeteer from 'puppeteer';
import { CategoriesNewsService } from 'src/categories-news/service/categories-news.service';
import { News } from 'src/schemas/news.schema';
import { changeUrlTypeNews } from 'src/utils/changeUrlTypeNews.util';
import { parseDate } from 'src/utils/parseDate.util';
import * as cron from 'node-cron';

@Injectable()
export class ScrapingService implements OnModuleInit {
  private readonly logger = new Logger(ScrapingService.name);

  constructor(
    private readonly categoriesNewsService: CategoriesNewsService,
    @InjectModel(News.name) private readonly newsModel: Model<News>,
  ) {}

  onModuleInit() {
    this.schedulingScrapingNews();
  }

  // Inserisce le notizie nel database se non esistono
  insertArticlesDatabase = async () => {
    const articles = await this.scrapingNews();
    let insertArticles = [];

    for (const article of articles) {
      const findArticleTitle = await this.newsModel
        .findOne({ title: article.title })
        .exec();

      if (!findArticleTitle) {
        insertArticles.push(
          await this.newsModel.create({
            title: article.title,
            summary: article.summary,
            date: article.date,
            link: article.link,
            id_category: article.id_category,
          }),
        );
      }
    }

    if (insertArticles.length === 0) {
      this.logger.debug('Nessuna notizia trovata');
      throw new NotFoundException('Nessuna nuova notizia trovata');
    }

    // const articles = await this.newsModel.create()

    return insertArticles;
  };

  // Visualizza tutte le notizie all'interno del database in ordine decrescente o effettuare la paginazione delle news
  getNews = async (
    nPage?: string,
    typeCategory?: string,
    initialDate?: Date,
    finalDate?: Date,
    nRecentNews?: string
  ) => {
    const filter: any = {};

    // L'utente ha inserito la categoria della news
    if (typeCategory) {
      const id_category = this.categoriesNewsService.getIdCategory(
        typeCategory.charAt(0).toUpperCase() + typeCategory.slice(1),
      );

      filter.id_category = id_category;
    }

    // L'utente ha inserito il range di date (data inizio - data fine)
    if (initialDate && finalDate) {
      if (initialDate > finalDate) {
        throw new BadRequestException(
          `La data iniziale (${initialDate}) deve essere inferiore (${finalDate}) a quella finale`,
        );
      }

      filter.date = {
        $gte: new Date(initialDate),
        $lte: new Date(finalDate).setHours(23, 59),
      };
    } else if (initialDate || finalDate) {
      throw new BadRequestException(
        'Devi inserire un range di date, quindi data iniziale e finale',
      );
    }

    // L'utente ha inserito la paginazione (numero della pagine che vuole visitare)
    let limit: number = 0;
    let skip: number;

    if (nPage) {
      limit = 10;
      skip = parseInt(nPage) && limit ? (parseInt(nPage) - 1) * limit : 0;
    }

    // L'utente vuole le notizie più recenti, solo se non inserisce il numero di pagina che vuol visitare
    if(nRecentNews && !nPage){
      limit = parseInt(nRecentNews)
    }else if(nRecentNews && nPage){
      throw new BadRequestException("Inserire solo il numero di news recenti da mostrare")
    }
    
    const options = {
      skip: skip,
      limit: limit,
      sort: { date: -1 },
    };

    const news = await this.newsModel
      .find(filter, null, options)
      .populate('id_category')
      .exec();
    if (news.length === 0) {
      throw new NotFoundException('Nessuna notizia disponibile');
    }

    const countPage = this.countPageTotals(news)

    return {
      news: news,
      ...(!nPage ? {countPage: countPage} : {})
    }
  };

  // Restituisce il numero totale di pagine
  countPageTotals = (news: any) => {
    const limit = 10;
    return Math.ceil(news.length / limit);
  };

  // Filtare le notizie per categoria o data (data inizio - data fine)
  getNewsFiltered = async (
    typeCategory?: string,
    initialDate?: Date,
    finalDate?: Date,
  ) => {
    const filter: any = {};

    if (typeCategory) {
      const id_category = this.categoriesNewsService.getIdCategory(
        typeCategory.charAt(0).toUpperCase() + typeCategory.slice(1),
      );

      filter.id_category = id_category;
    }

    if (initialDate && finalDate) {
      if (initialDate > finalDate) {
        throw new BadRequestException(
          `La data iniziale (${initialDate}) deve essere inferiore (${finalDate}) a quella finale`,
        );
      }

      filter.date = {
        $gte: new Date(initialDate),
        $lte: new Date(finalDate).setHours(23, 59),
      };
    } else if (initialDate || finalDate) {
      throw new BadRequestException(
        'Devi inserire un rage di date, quindi data iniziale e finale',
      );
    }

    const newsFiltered = await this.newsModel
      .find(filter)
      .sort({ date: -1 })
      .exec();

    if (newsFiltered.length === 0) {
      throw new NotFoundException(
        'Nessuna notizia disponibile per questo filtro',
      );
    }

    return newsFiltered;
  };

  // Preleva le notizie dal sito Ansa sicilia
  scrapingNews = async () => {
    try {
      const categories = this.categoriesNewsService.categories;

      const news = [];

      const browser = await puppeteer.launch({
        // product: "chrome",
        executablePath:
          '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: false,
        // headless: true,
        timeout: 90000,
      });

      const scrapePage = async (url: string, idCategory: string) => {
        const page = await browser.newPage();

        await page.goto(url, {
          timeout: 90000,
          waitUntil: 'domcontentloaded',
        });

        await page.waitForSelector('.articles-list.wide', {
          timeout: 90000,
        });

        const titleArticles = await page.$$eval(
          '.articles-list.wide .article-teaser .article-content .title a',
          (elements) => {
            return elements.map(
              (element: HTMLAnchorElement) => element.innerText,
            );
          },
        );

        const summaryArticles = await page.$$eval(
          '.articles-list.wide .article-teaser .article-content .summary',
          (elements) => {
            return elements.map(
              (element: HTMLAnchorElement) => element.innerText,
            );
          },
        );

        const dateArticles = await page.$$eval(
          '.articles-list.wide .article-teaser .article-content .meta .date',
          (elements) => {
            return elements.map(
              (element: HTMLAnchorElement) => element.innerText,
            );
          },
        );

        const linkArticles = await page.$$eval(
          '.articles-list.wide .article-teaser .article-content .title a',
          (elements) => {
            return elements.map(
              (element: HTMLAnchorElement) => element.href,
            );
          },
        );

        const articles = titleArticles.map((title, index) => ({
          title: title,
          summary: summaryArticles[index],
          date: parseDate(dateArticles[index]),
          link: linkArticles[index],
          id_category: idCategory,
        }));

        await page.close();

        return articles;
      };

      const nPage = 1;
      const allPromises = [];

      for (let i = 1; i <= nPage; i++) {
        categories.forEach((category) => {
          const url = changeUrlTypeNews(category.type, i);
          allPromises.push(scrapePage(url, category._id));
        });
      }

      const results = await Promise.all(allPromises);
      results.forEach((article) => news.push(...article));

      await browser.close();

      console.log(news);
      this.logger.debug('Caricate nuove news');
      return news;
    } catch (error) {
      throw new RequestTimeoutException(error.message);
    }
  };

  schedulingScrapingNews = () => {
    // Esecuzione ogni sei ore al minuto 0 di ogni ora
    // cron.schedule('0 */6 * * * ', () => {
    //   try {
    //     this.insertArticlesDatabase();
    //   } catch (error) {
    //     this.logger.error(`Error: ${error}`);
    //   }
    // });
  };


  
}
