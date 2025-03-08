import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserMongodbRepository } from 'src/user/repositories/user.mongo.repository';
import { UserSqlRepository } from './repositories/user.sql.repository';
import { User as UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserService, UserMongodbRepository, UserSqlRepository],
  controllers: [UserController],
  exports: [UserService, UserMongodbRepository, UserSqlRepository],
})
export class UserModule {}
