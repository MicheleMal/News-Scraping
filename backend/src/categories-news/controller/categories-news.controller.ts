import { Controller, Get } from '@nestjs/common';
import { CategoriesNewsService } from '../service/categories-news.service';

@Controller('categories-news')
export class CategoriesNewsController {
    constructor(private readonly categoriesNewsService: CategoriesNewsService){}

    @Get("/")
    getAllCategories(){
        return this.categoriesNewsService.getAllCategories()
    }
}
