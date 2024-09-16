import { Module } from '@nestjs/common';
import { CategoriesNewsService } from './service/categories-news.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { CategoriesNewsController } from './controller/categories-news.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoriesNewsController],
  providers: [CategoriesNewsService],
  exports: [CategoriesNewsService]
})
export class CategoriesNewsModule {}
