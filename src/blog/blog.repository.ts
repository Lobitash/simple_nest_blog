import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Blog } from './blog.schema';

@Injectable()
export class BlogRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async create(title: string, content: string, authorId: string) {
    const blog = new this.blogModel({ title, content, authorId });
    return blog.save();
  }

  async getBlogs() {
    return this.blogModel.find().exec();
  }
}
