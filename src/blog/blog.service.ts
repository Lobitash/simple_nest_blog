import { Injectable } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { UserRepository } from 'src/user/user.repository';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class BlogService {
  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly userRepository: UserRepository,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async createBlog(title: string, content: string, userId: string) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const newBlog = await this.blogRepository.create(
        title,
        content,
        userId,
        session,
      );
      await this.userRepository.incrementPostCount(userId, session);
      await session.commitTransaction();
      return newBlog;
    } catch (error) {
      session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async getBlogs() {
    return this.blogRepository.getBlogs();
  }
}
