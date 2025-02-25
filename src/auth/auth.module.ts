import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { UserRepository } from 'src/user/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from 'src/user/user.schema';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'DayOne',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, UserRepository],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
