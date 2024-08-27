import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { scraping } from 'src/utils/scrapingNews.util';

@Injectable()
export class ScrapingService {
  insertArticlesDatabase = async () => {
    const articles = await scraping();
    return articles;
  };
}
