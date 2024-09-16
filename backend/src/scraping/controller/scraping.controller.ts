import { Controller, Get, Param, Query } from '@nestjs/common';
import { ScrapingService } from '../service/scraping.service';

@Controller('scraping')
export class ScrapingController {

    constructor(private readonly scrapingService: ScrapingService){}

    @Get('insertDatabase')
    insertArticles(){
        return this.scrapingService.insertArticlesDatabase()
    }

    @Get('news')
    getAllNews(@Query('page') nPage?: number, @Query('t') typeCategory?: string, @Query('dateI') initialDate?: Date, @Query('dateF') finalDate?: Date){
        return this.scrapingService.getNews(nPage, typeCategory, initialDate, finalDate)
    }

    // @Get('nPage')
    // returnNPageTotals(){
    //     return this.scrapingService.countPageTotals()
    // }
}
