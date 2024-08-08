import { Module } from '@nestjs/common';
import { ScrapingController } from './controller/scraping.controller';
import { ScrapingService } from './service/scraping.service';

@Module({
  controllers: [ScrapingController],
  providers: [ScrapingService]
})
export class ScrapingModule {}
