import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Blog } from '../schemas/blog.schema';
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

  // async create2(
  //   title: string,
  //   content: string,
  //   userId: string,
  //   session: ClientSession,
  // ) {
  //   return this.blogModel.create([{ title, content, author: userId }], {
  //     session,
  //   });
  // }

  async getBlogs() {
    return this.blogModel.find().exec();
  }
}
