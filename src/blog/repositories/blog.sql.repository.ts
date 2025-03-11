import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from '../entities/blog.entity';
import { IBlogRepository } from './interfaces/blog.repository.interface';

@Injectable()
export class BlogSqlRepository implements IBlogRepository {
  constructor(@InjectRepository(Blog) private blogRepo: Repository<Blog>) {}

  async createBlog(
    data: { title: string; content: string; userId: string },
    session?: EntityManager,
  ): Promise<Blog> {
    if (session) {
      return session.getRepository(Blog).save(data);
    }
    return this.blogRepo.save(data);
  }

  async findPostById(id: string) {
    return this.blogRepo.findOne({ where: { id } });
  }

  async getBlogs() {
    return this.blogRepo.find();
  }
}
