import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { UserMongodbRepository } from 'src/user/repositories/mongodb/user.mongo.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from 'src/user/schemas/user.schema';
import { AuthController } from './controllers/auth.controller';
import { UserSqlRepository } from 'src/user/repositories/sql/user.sql.repository';
import { User as UserEntity } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'DayOne',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UserMongodbRepository,
    UserSqlRepository,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
