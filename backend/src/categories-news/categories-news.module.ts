import { Module } from '@nestjs/common';
import { CategoriesNewsService } from './service/categories-news.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [CategoriesNewsService],
  exports: [CategoriesNewsService]
})
export class CategoriesNewsModule {}
