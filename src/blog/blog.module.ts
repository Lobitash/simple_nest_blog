import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blog.schema';
import { BlogRepository } from './blog.repository';
import { UserRepository } from 'src/user/user.repository';
import { User, UserSchema } from 'src/user/user.schema';
import { BlogManager } from './blog.manager';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [BlogService, BlogRepository, UserRepository, BlogManager],
  controllers: [BlogController],
  exports: [BlogRepository],
})
export class BlogModule {}
