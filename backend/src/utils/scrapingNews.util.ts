import puppeteer from 'puppeteer';
import { changeUrlTypeNews } from './changeUrlTypeNews.util';
import { parseDate } from './parseDate.util';

export const scraping = async () => {
  try {
    const news = [];

    const browser = await puppeteer.launch({
      // product: "chrome",
      executablePath:
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: false,
      timeout: 80000,
    });

    const page = await browser.newPage();

    for (let i = 1; i <= 10; i++) {
      const url = changeUrlTypeNews('cronaca', i);

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

      news.push(...articles);
    }
    await browser.close();

    console.log(news);
  } catch (error) {
    console.log(error);
  }
};
