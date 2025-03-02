/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from '../../entities/blog.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BlogRepository {
  constructor(@InjectRepository(Blog) private blogRepo: Repository<Blog>) {}

  async create(title: string, content: string, userId: string) {
    const blog = this.blogRepo.create({
      title,
      content,
      author: { id: userId },
    });
    return this.blogRepo.save(blog);
  }

  async getBlogs() {
    return this.blogRepo.find({ relations: ['author'] });
  }
}
