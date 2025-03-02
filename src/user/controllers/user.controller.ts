import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  //Unused APIs , Moved signUp and login to AuthController

  @Post('signup')
  async signup(@Body() body: { email: string; password: string }) {
    return this.userService.signup(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.userService.login(body.email, body.password);
  }
}
