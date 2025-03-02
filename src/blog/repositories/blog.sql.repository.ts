/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
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
    // const blog = this.blogRepo.create({
    //   title,
    //   content,
    //   author: { id: userId },
    // });
    // return this.blogRepo.save(blog);
    if (session) {
      return session.getRepository(Blog).save(data);
    }
    // const blog = this.blogRepo.create(data);
    return this.blogRepo.save(data);
  }

  async findPostById(id: string) {
    return this.blogRepo.findOne({ where: { id } });
  }

  async getBlogs() {
    return this.blogRepo.find();
    // return this.blogRepo.find({ relations: ['author'] });
  }
}
