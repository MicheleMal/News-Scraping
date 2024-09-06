import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapingModule } from './scraping/scraping.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesNewsModule } from './categories-news/categories-news.module';

/*
  TODO: Scraping automatico delle notizie ogni ora
*/

@Module({
  imports: [ScrapingModule,
    MongooseModule.forRoot("mongodb://localhost:27017/NewsScraping")
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
