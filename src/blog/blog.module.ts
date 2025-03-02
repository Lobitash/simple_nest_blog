import { Module } from '@nestjs/common';
import { BlogService } from './services/blog.service';
import { BlogController } from './controllers/blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './schemas/blog.schema';
import { BlogRepository } from './repositories/mongodb/blog.mongo.repository';
import { UserMongodbRepository } from 'src/user/repositories/mongodb/user.mongo.repository';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { BlogManager } from './managers/blog.manager';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [BlogService, BlogRepository, UserMongodbRepository, BlogManager],
  controllers: [BlogController],
  exports: [BlogRepository],
})
export class BlogModule {}
