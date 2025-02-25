import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Blog } from './blog.schema';
import { Types } from 'mongoose';

@Injectable()
export class BlogRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async create(
    title: string,
    content: string,
    userId: string,
    session: ClientSession,
  ) {
    const blogData = {
      title,
      content,
      author: new Types.ObjectId(userId),
    };
    const blog = new this.blogModel(blogData);
    return blog.save({ session });
  }

  async getBlogs() {
    return this.blogModel.find().exec();
  }
}
