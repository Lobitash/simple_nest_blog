import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Blog } from '../schemas/blog.schema';
import { Types } from 'mongoose';
import { IBlogRepository } from './interfaces/blog.repository.interface';

@Injectable()
export class BlogMongodbRepository implements IBlogRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async createBlog(
    data: { title: string; content: string; userId: string },
    session?: ClientSession,
  ): Promise<Blog> {
    const blog = new this.blogModel({
      title: data.title,
      content: data.content,
      author: new Types.ObjectId(data.userId),
    });
    return blog.save({ session });
  }
  async findPostById(id: string): Promise<Blog | null> {
    return this.blogModel.findById(id);
  }
  async getBlogs() {
    return this.blogModel.find().exec();
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
}
