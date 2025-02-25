import { Injectable } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class BlogService {
  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createBlog(
    title: string,
    content: string,
    authorId: string,
    userId: string,
  ) {
    const newBlog = this.blogRepository.create(
      title,
      content,
      authorId,
      userId,
    );
    await this.userRepository.incrementPostCount(userId);
    return newBlog;
  }

  async getBlogs() {
    return this.blogRepository.getBlogs();
  }
}
