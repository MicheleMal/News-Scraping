import { Injectable, Logger, NotFoundException, OnModuleInit, RequestTimeoutException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import puppeteer from 'puppeteer';
import { CategoriesNewsService } from 'src/categories-news/service/categories-news.service';
import { News } from 'src/schemas/news.schema';
import { changeUrlTypeNews } from 'src/utils/changeUrlTypeNews.util';
import { parseDate } from 'src/utils/parseDate.util';
import * as cron from "node-cron"

@Injectable()
export class ScrapingService implements OnModuleInit {

  private readonly logger = new Logger(ScrapingService.name)

  constructor(
    private readonly categoriesNewsService: CategoriesNewsService,
    @InjectModel(News.name) private readonly newsModel: Model<News>,
  ) {}

  onModuleInit() {
   this.schedulingScrapingNews()
  }

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
            id_category: article.id_category,
          }),
        );
      }
    }

    if(insertArticles.length===0){
      this.logger.debug("Nessuna notizia trovata")
      throw new NotFoundException("Nessuna nuova notizia trovata")
    }

    // const articles = await this.newsModel.create()

    return insertArticles;
  };

  getAllNews = async () => {
    const allNews = await this.newsModel.find().populate("id_category").exec()

    if(allNews.length===0){
      throw new NotFoundException("Nessuna news caricata")
    }

    return allNews;
  };

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

        const articles = titleArticles.map((title, index) => ({
          title: title,
          summary: summaryArticles[index],
          date: parseDate(dateArticles[index]),
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
      this.logger.debug("Caricate nuove news")
      return news;
    } catch (error) {
      throw new RequestTimeoutException(error.message);
    }
  };

  schedulingScrapingNews = () => {

    cron.schedule("0 * * * * ", ()=>{
        try {
          this.insertArticlesDatabase()
        } catch (error) {
            this.logger.error(`Error: ${error}`)
        }
    })
  }

}
