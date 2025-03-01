import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { BlogRepository } from '../repositories/blog.repository';
import { UserRepository } from 'src/user/repositories/user.repository';

@Injectable()
export class BlogManager {
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
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
