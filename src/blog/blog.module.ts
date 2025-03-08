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
import { TransactionProvider } from 'src/shared/transaction/transaction.provider';
// const TransactionExecuterProviders: Provider = {
//   provide: 'TransactionExecuter',
//   useClass:
//     process.env.DATABASE_TYPE === 'sql'
//       ? SqlTransactionExecuter
//       : MongooseTransactionExecuter,
// };

const TransactionExecuterProvider = {
  provide: 'ITransactionExecuter',
  useFactory: (sqlExecuter: SqlTransactionExecuter, mongoExecuter: MongooseTransactionExecuter) => {
    //Ali said when we are using useFactories, We should read enviourmnet variables from Config 
    // What is the difference between Reading Variables From Config and process.env
    return process.env.DATABASE_TYPE === 'sql' ? sqlExecuter : mongoExecuter;
  },
  inject: [SqlTransactionExecuter, MongooseTransactionExecuter],
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
    SqlTransactionExecuter,
    MongooseTransactionExecuter,
    { provide: 'UserRepository', useClass: UserMongodbRepository },

    //Ali Said It will also work this Way. SO we Can use useClass instead
    // {
    //   provide: "ekxjs",
    //   useClass: process.env.DB == 'sql' ? SqlTransactionExecuter : MongooseTransactionExecuter
    // }
  ],
  controllers: [BlogController],
  exports: [BlogMongodbRepository, BlogSqlRepository,
    UserMongodbRepository, 'ITransactionExecuter'],
})
export class BlogModule { }
