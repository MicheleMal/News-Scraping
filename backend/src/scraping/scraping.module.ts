import { Module } from '@nestjs/common';
import { ScrapingController } from './controller/scraping.controller';
import { ScrapingService } from './service/scraping.service';
import { CategoriesNewsModule } from 'src/categories-news/categories-news.module';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from 'src/schemas/news.schema';

@Module({
  imports: [CategoriesNewsModule, MongooseModule.forFeature([
    {
      name: News.name,
      schema: NewsSchema
    }
  ])],
  controllers: [ScrapingController],
  providers: [ScrapingService]
})
export class ScrapingModule {}
