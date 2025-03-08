/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import { BlogManager } from '../managers/blog.manager';
import { CreateBlogDto } from '../dtos/create-blog.dto';
import { BlogMongodbRepository } from '../repositories/blog.mongo.repository';
import { BlogSqlRepository } from '../repositories/blog.sql.repository';
import { IBlogRepository } from '../repositories/interfaces/blog.repository.interface';
@Injectable()
export class BlogService {
  private blogRepo: IBlogRepository;
  constructor(
    
    private readonly BlogsqlRepo:  BlogSqlRepository,
    private readonly BlogMongodbRepo: BlogMongodbRepository,
    private readonly blogManger: BlogManager,
  ) {
    this.blogRepo =
      process.env.DATABASE_TYPE === 'sql' ? this.BlogsqlRepo : this.BlogMongodbRepo;
  }

  async createBlog(dto: CreateBlogDto, userId: string) {
    console.log('BlogService, Create Blog')
    const newBlog= this.blogManger.createBlog(dto , userId)
    // const tra = (trx: TransactionManager) => {};

    return newBlog;
  }

  async getBlogs() {
    console.log('BlogService, Get Blogs')
    return this.blogRepo.getBlogs();
  }
}
