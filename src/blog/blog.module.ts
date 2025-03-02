import { Module, Provider } from '@nestjs/common';
import { BlogService } from './services/blog.service';
import { BlogController } from './controllers/blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './schemas/blog.schema';
import { UserMongodbRepository } from 'src/user/repositories/user.mongo.repository';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { BlogManager } from './managers/blog.manager';
import { BlogMongodbRepository } from './repositories/blog.mongo.repository';
import { BlogSqlRepository } from './repositories/blog.sql.repository';
import { Blog as BlogEntity } from './entities/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqlTransactionExecuter } from 'src/shared/transaction/sql.transaction.executer';
import { MongooseTransactionExecuter } from 'src/shared/transaction/mongoose.transaction.executer';

const TransactionExecuterProvider: Provider = {
  provide: 'TransactionExecuter',
  useClass:
    process.env.DB_TYPE === 'sql'
      ? SqlTransactionExecuter
      : MongooseTransactionExecuter,
};

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogEntity]),
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [
    BlogService,
    BlogMongodbRepository,
    BlogSqlRepository,
    UserMongodbRepository,
    BlogManager,
    TransactionExecuterProvider,
  ],
  controllers: [BlogController],
  exports: [BlogMongodbRepository, BlogSqlRepository, 'TransactionExecuter'],
})
export class BlogModule {}
