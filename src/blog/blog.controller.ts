import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: { title: string; content: string }, @Req() req) {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User not found');
    }
    return this.blogService.createBlog(body.title, body.content, userId);
  }

  @Get('list')
  async getblogs() {
    return this.blogService.getBlogs();
  }
}
