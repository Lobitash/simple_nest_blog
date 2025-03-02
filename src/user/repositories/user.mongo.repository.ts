import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { Types } from 'mongoose';

@Injectable()
export class UserMongodbRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(userData: Partial<User>): Promise<User> {
    console.log('Mongo User', userData);
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async incrementPostCount(userId: string, session: ClientSession) {
    return this.userModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      { $inc: { posts: 1 } },
      { session },
    );
  }

  // async incrementPostCount2(userId: string, session: ClientSession) {
  //   return this.userModel.updateOne(
  //     { _id: userId },
  //     { $inc: { posts: 1 } },
  //     { session },
  //   );
  // }
}
