import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserSqlRepository {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createUser(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepo.create(userData);
    return this.userRepo.save(newUser);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } });
  }

  async incrementPostCount(userId: string) {
    return this.userRepo.increment({ id: userId }, 'posts', 1);
  }
}
