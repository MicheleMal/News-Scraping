import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";
import { Category } from "./category.schema";

export type NewsDocument = HydratedDocument<News>

@Schema()
export class News {

    @Prop({ type: String, required: true })
    title: string;
  
    @Prop({ type: String, required: false })
    summary: string;
  
    @Prop({ type: Date, required: true })
    date: Date;

    @Prop({type: String, required: true})
    link: string

    @Prop({required: false, type: SchemaTypes.ObjectId, ref: Category.name})
    id_category: Types.ObjectId
}

export const NewsSchema = SchemaFactory.createForClass(News)