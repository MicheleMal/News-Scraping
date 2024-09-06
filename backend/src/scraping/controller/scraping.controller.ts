import { Controller, Get } from '@nestjs/common';
import { ScrapingService } from '../service/scraping.service';

@Controller('scraping')
export class ScrapingController {

    constructor(private readonly scrapingService: ScrapingService){}

    @Get('insertDatabase')
    insertArticles(){
        return this.scrapingService.insertArticlesDatabase()
    }

    @Get('all-news')
    getAllNews(){
        return this.scrapingService.getAllNews()
    }

}
