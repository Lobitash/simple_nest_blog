import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './blog.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async createBlog(title: string, content: string, authorId: string) {
    const blog = new this.blogModel({ title, content, authorId });
    console.log('Blog created successfully');
    return blog.save();
  }

  async getBlogs() {
    return this.blogModel.find();
  }
}
