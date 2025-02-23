import { Injectable } from '@nestjs/common';
import { BlogRepository } from './blog.repository';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  async createBlog(title: string, content: string, authorId: string) {
    return this.blogRepository.create(title, content, authorId);
  }

  async getBlogs() {
    return this.blogRepository.getBlogs();
  }
}
