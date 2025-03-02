import { Injectable } from '@nestjs/common';
import { BlogRepository } from '../repositories/mongodb/blog.mongo.repository';
import { BlogManager } from '../managers/blog.manager';
import { CreateBlogDto } from '../dtos/create-blog.dto';
import { Transaction } from 'mongodb';
@Injectable()
export class BlogService {
  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly blogManger: BlogManager,
  ) {}

  async createBlog(dto: CreateBlogDto, userId: string) {
    const newBlog = await this.blogManger.createBlog(dto, userId);

    // const tra = (trx: TransactionManager) => {};

    return newBlog;
  }

  async getBlogs() {
    return this.blogRepository.getBlogs();
  }
}
