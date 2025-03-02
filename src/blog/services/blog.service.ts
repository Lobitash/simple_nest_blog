/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
// import { BlogManager } from '../managers/blog.manager';
import { CreateBlogDto } from '../dtos/create-blog.dto';
import { BlogMongodbRepository } from '../repositories/blog.mongo.repository';
import { BlogSqlRepository } from '../repositories/blog.sql.repository';
import { IBlogRepository } from '../repositories/interfaces/blog.repository.interface';
@Injectable()
export class BlogService {
  private blogRepo: IBlogRepository;
  constructor(
    private readonly BlogsqlRepo: BlogMongodbRepository,
    private readonly BlogMongodbRepo: BlogSqlRepository,
    // private readonly blogManger: BlogManager,
  ) {
    this.blogRepo =
      process.env.DB_TYPE === 'sql' ? this.BlogsqlRepo : this.BlogMongodbRepo;
  }

  async createBlog(dto: CreateBlogDto, userId: string) {
    const newBlog = await this.blogRepo.createBlog({
      title: dto.title,
      content: dto.content,
      userId,
    });

    // const tra = (trx: TransactionManager) => {};

    return newBlog;
  }

  async getBlogs() {
    return this.blogRepo.getBlogs();
  }
}
