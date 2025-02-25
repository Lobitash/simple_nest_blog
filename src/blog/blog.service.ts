import { Injectable } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class BlogService {
  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createBlog(title: string, content: string, userId: string) {
    console.log('Creating Blog:', { title, content, author: userId });
    const newBlog = await this.blogRepository.create(title, content, userId);
    await this.userRepository.incrementPostCount(userId);
    return newBlog;
  }

  async getBlogs() {
    return this.blogRepository.getBlogs();
  }
}
