import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { Types } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(userData: Partial<User>): Promise<User> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async incrementPostCount(userId: string) {
    console.log('Incrementing post count for:', userId);
    // await this.userModel.findById(userId, { $inc: { posts: 1 } }).exec();
    return this.userModel.updateOne(
      { _id: new Types.ObjectId(userId) }, // ✅ Ensure userId is an ObjectId
      { $inc: { posts: 1 } },
    );
  }
}
