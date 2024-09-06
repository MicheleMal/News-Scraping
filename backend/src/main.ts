import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CategoriesNewsService } from './categories-news/service/categories-news.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const categoryNewsService = app.get(CategoriesNewsService)
  await categoryNewsService.loadCategories()

  await app.listen(3000);

}
bootstrap();
