import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRepository } from 'src/user/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userData: Partial<User>): Promise<User> {
    return this.userRepository.createUser(userData);
  }

  async signup(email: string, password: string) {
    const user = await this.userRepository.findUserByEmail(email);
    if (user) {
      throw new UnauthorizedException('User already exists');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.userRepository.createUser({
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
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid Credentials');
    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
    return token;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findUserByEmail(email);
  }
}
