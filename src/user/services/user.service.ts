import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserMongodbRepository } from 'src/user/repositories/user.mongo.repository';

@Injectable()
export class UserService {
  constructor(private readonly UserMongodbRepository: UserMongodbRepository) {}

  async createUser(userData: Partial<User>): Promise<User> {
    return this.UserMongodbRepository.createUser(userData);
  }

  async signup(email: string, password: string) {
    const user = await this.UserMongodbRepository.findUserByEmail(email);
    if (user) {
      throw new UnauthorizedException('User already exists');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.UserMongodbRepository.createUser({
        email,
        password: hashedPassword,
      });
      if (newUser) {
        return {
          email: newUser.email,
          message: 'User created successfully',
        };
      }
    }
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.UserMongodbRepository.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid Credentials');
    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
    return token;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.UserMongodbRepository.findUserByEmail(email);
  }
}
