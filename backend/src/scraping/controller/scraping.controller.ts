import { Controller, Get, Param, Query } from '@nestjs/common';
import { ScrapingService } from '../service/scraping.service';

@Controller('scraping')
export class ScrapingController {

    constructor(private readonly scrapingService: ScrapingService){}

    @Get('insertDatabase')
    insertArticles(){
        return this.scrapingService.insertArticlesDatabase()
    }

    @Get('all-news')
    getAllNews(@Query('page') nPage?: number){
        return this.scrapingService.getAllNews(nPage)
    }

    @Get('news')
    getNewsFiltered(@Query('t') typeCategory?: string, @Query('dateI') initialDate?: Date, @Query('dateF') finalDate?: Date){
        return this.scrapingService.getNewsFiltered(typeCategory, initialDate, finalDate)
    }

    @Get('nPage')
    returnNPageTotals(){
        return this.scrapingService.countPageTotals()
    }
}
