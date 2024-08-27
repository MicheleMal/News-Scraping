import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapingModule } from './scraping/scraping.module';

/*
  TODO: Scraping automatico delle notizie ogni ora
  TODO: Inserire notiize nel database, ogni ora controllare se la notizia è presente nel db altrimenti inserirla
*/

/*
  1) Scraping notizia sito ansa
  2) Controllare la categoria della notizia, prendere l'id corrispondente dal database
  3) Inserire la notiiza nel database tabella news con l'id della categoria corrispondente, solo se non esiste
*/

@Module({
  imports: [ScrapingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
