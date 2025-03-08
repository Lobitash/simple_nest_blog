import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiTags, ApiOperation,ApiResponse } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  //Unused APIs , Moved signUp and login to AuthController

  // @Post('signup')
  // async signup(@Body() body: { email: string; password: string }) {
  //   return this.userService.signup(body.email, body.password);
  // }

  // @Post('login')
  // async login(@Body() body: { email: string; password: string }) {
  //   return this.userService.login(body.email, body.password);
  // }
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of Users' })
  @Get()
  async getUsers(){
    return this.userService.getUsers()
  }

}
