/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { UserMongodbRepository } from 'src/user/repositories/user.mongo.repository';
import { CreateBlogDto } from '../dtos/create-blog.dto';
import { IBlogRepository } from '../repositories/interfaces/blog.repository.interface';
import { BlogMongodbRepository } from '../repositories/blog.mongo.repository';
import { BlogSqlRepository } from '../repositories/blog.sql.repository';
import { ITransactionExecuter } from 'src/shared/transaction/transaction.executer';
@Injectable()
export class BlogManager {
  private blogRepo: IBlogRepository;
  constructor(
    private readonly BlogsqlRepo: BlogMongodbRepository,
    private readonly BlogMongodbRepo: BlogSqlRepository,
    private readonly UserMongodbRepository: UserMongodbRepository,
    private readonly transactionManager: ITransactionExecuter,
  ) {
    this.blogRepo =
      process.env.DB_TYPE === 'sql' ? this.BlogsqlRepo : this.BlogMongodbRepo;
  }

  async createBlog(dto: CreateBlogDto, userId: string) {
    return this.transactionManager.executeTransaction(async (transaction) => {
      const newBlog = await this.blogRepo.createBlog(
        {
          title: dto.title,
          content: dto.content,
          userId,
        },
        transaction,
      );

      await this.UserMongodbRepository.incrementPostCount(userId, transaction);
      return newBlog;
    });
  }
}
