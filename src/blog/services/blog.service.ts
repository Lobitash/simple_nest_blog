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
    const newBlog= this.blogManger.createBlog(dto , userId)
    return newBlog;
  }

  async getBlogs() {
    return this.blogRepo.getBlogs();
  }
}
