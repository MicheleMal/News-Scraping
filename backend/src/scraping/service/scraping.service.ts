import { Injectable } from '@nestjs/common';
import puppeteer from "puppeteer"
import { scraping } from 'src/utils/scrapingNews.util';

@Injectable()
export class ScrapingService {

    insertArticlesDatabase = async () =>{
        try {
            const articles = await scraping()
            return articles
        } catch (error) {
            console.log(error)
        }
    }
}
