/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserMongodbRepository } from '../../user/repositories/user.mongo.repository';
import { UserSqlRepository } from 'src/user/repositories/user.sql.repository';
import { LoginDto } from '../dtos/login.dto';
import { SignupDto } from '../dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserMongodbRepo: UserMongodbRepository,
    private readonly UserSqlRepo: UserSqlRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user =
      process.env.DATABASE_TYPE === 'sql'
        ? await this.UserSqlRepo.findUserByEmail(email)
        : await this.UserMongodbRepo.findUserByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    const payload = { id: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(dto: SignupDto) {
    const existingUser =
      process.env.DATABASE_TYPE === 'sql'
        ? await this.UserSqlRepo.findUserByEmail(dto.email)
        : await this.UserMongodbRepo.findUserByEmail(dto.email);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser =
      process.env.DATABASE_TYPE === 'sql'
        ? await this.UserSqlRepo.createUser({
            email: dto.email,
            password: hashedPassword,
          })
        : await this.UserMongodbRepo.createUser({
            email: dto.email,
            password: hashedPassword,
          });

    return { email: newUser.email, message: 'User Created Successfully' };
  }
}
