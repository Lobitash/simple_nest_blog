import { Injectable } from '@nestjs/common';
import { BlogRepository } from '../repositories/blog.repository';
import { BlogManager } from '../managers/blog.manager';
import { CreateBlogDto } from '../dtos/create-blog.dto';
@Injectable()
export class BlogService {
  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly blogManger: BlogManager,
  ) {}

  async createBlog(dto: CreateBlogDto, userId: string) {
    const newBlog = await this.blogManger.createBlog(dto, userId);
    return newBlog;
  }

  async getBlogs() {
    return this.blogRepository.getBlogs();
  }
}
