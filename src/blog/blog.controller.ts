import { Controller, Post, Get, Body } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @Post('create')
  async create(
    @Body() body: { title: string; content: string; authorId: string },
  ) {
    return this.blogService.createBlog(body.title, body.content, body.authorId);
  }

  @Get('list')
  async getblogs() {
    return this.blogService.getBlogs();
  }
}
