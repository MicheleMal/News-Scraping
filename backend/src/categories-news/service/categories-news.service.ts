import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category } from 'src/schemas/category.schema';

@Injectable()
export class CategoriesNewsService {

    constructor(
        @InjectModel(Category.name) private readonly categoryModel: Model<Category>
    ){}

    categories = []

    // Prnede tutte le categorie, li salva in locale
    async loadCategories(){
        this.categories = await this.categoryModel.find().exec()
        return this.categories
    }
 
    getIdCategory(typeCategory: string){        
        const idCategory = this.categories.find(category => category.type === typeCategory)?._id

        if(idCategory === undefined){
            throw new NotFoundException("Categoria inesistente")
        }

        return idCategory
    }

}
