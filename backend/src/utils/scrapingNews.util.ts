import puppeteer from 'puppeteer';
import { changeUrlTypeNews } from './changeUrlTypeNews.util';
import { parseDate } from './parseDate.util';
import { RequestTimeoutException } from '@nestjs/common';

export const scraping = async () => {
  try {
    const news = [];
    const typeNews = [
      'cronaca',
      'politica',
      'economia',
      'cultura',
      'sport',
      'sanità regionale',
    ]; //? include tipo viaggi se la inserisco nel switch

    const browser = await puppeteer.launch({
      // product: "chrome",
      executablePath:
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: false,
      timeout: 90000,
    });

    const scrapePage = async (url: string) => {
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
      }));

      await page.close();

      return articles;
    };

    const nPage = 2;
    const allPromises = [];
    for (let i = 1; i <= nPage; i++) {
      for (let type of typeNews) {
        const url = changeUrlTypeNews(type, i);
        allPromises.push(scrapePage(url));
      }
    }

    const results = await Promise.all(allPromises);
    results.forEach((article) => news.push(...article));

    await browser.close();

    // console.log(news);
    return news
  } catch (error) {
    throw new RequestTimeoutException(error.message)
  }
};
