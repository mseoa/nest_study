import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { JwtSecret } from './auth.module';

// https://docs.nestjs.com/recipes/passport
@Injectable() // PassportStrategy class takes two arguments: a strategy implementation and the name of the strategy
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),// extract the JWT from the request Header
      secretOrKey: JwtSecret,// tells the strategy what secret to use to verify the JWT
    }); // ref: https://github.com/mikenicholson/passport-jwt#configure-strategy
  }// 1.Passport verifies the JWT's signature and decodes the JSON

  // 2. decoded JSON is then passed to the validate() method
  async validate(payload: { userId: number }) {
    const user = await this.usersService.findOne(payload.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
