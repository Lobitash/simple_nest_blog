import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserMongodbRepository } from 'src/user/repositories/mongodb/user.mongo.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly UserMongodbRepository: UserMongodbRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'DayOne',
    });
  }

  async validate(payload: any) {
    const user = await this.UserMongodbRepository.findById(payload.id);
    if (!user) return null;
    // return { id: payload.id, email: payload.email };
    return user;
  }
}
