import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapingModule } from './scraping/scraping.module';

/*
  TODO: Scraping automatico delle notizie ogni ora
  TODO: Inserire notiize nel database, ogni ora controllare se la notizia è presente nel db altrimenti inserirla
*/

@Module({
  imports: [ScrapingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
