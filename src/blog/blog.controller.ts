import { Controller, Post, Get, Body, Req } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @Post('create')
  async create(
    @Body() body: { title: string; content: string; authorId: string },
    @Req() req,
  ) {
    console.log(req);
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User not found');
    }
    return this.blogService.createBlog(
      body.title,
      body.content,
      body.authorId,
      userId,
    );
  }

  @Get('list')
  async getblogs() {
    return this.blogService.getBlogs();
  }
}
