import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../../user/repositories/user.repository';
import { LoginDto } from '../dtos/login.dto';
import { SignupDto } from '../dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    const payload = { id: user._id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(dto: SignupDto) {
    const user = await this.userRepository.findUserByEmail(dto.email);
    if (user) {
      throw new UnauthorizedException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.userRepository.createUser({
      email: dto.email,
      password: hashedPassword,
    });
    return { email: newUser.email, message: 'User Created Successfully' };
  }
}
