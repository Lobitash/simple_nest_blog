import { Injectable } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { BlogManager } from './blog.manager';
@Injectable()
export class BlogService {
  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly blogManger: BlogManager,
  ) {}

  async createBlog(title: string, content: string, userId: string) {
    const newBlog = await this.blogManger.createBlog(title, content, userId);
    return newBlog;
  }

  async getBlogs() {
    return this.blogRepository.getBlogs();
  }
}
