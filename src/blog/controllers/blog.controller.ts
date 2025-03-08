/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { BlogService } from '../services/blog.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateBlogDto } from '../dtos/create-blog.dto';
import { Request } from 'express';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() createBlogDto: CreateBlogDto, @Req() req: Request) {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User not found');
    }
    return this.blogService.createBlog(createBlogDto, userId);
  }

  @Get('list')
  async getblogs() {
    console.log('Blog Controller, GetBlogs')
    return this.blogService.getBlogs();
  }
}
