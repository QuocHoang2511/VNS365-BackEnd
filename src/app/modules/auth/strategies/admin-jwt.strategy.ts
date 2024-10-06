import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_CONSTANTS } from 'src/utils/constants';

interface IPayload {
  sub: number;
  username: string;
}

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_CONSTANTS.ADMIN_ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: IPayload) {
    return { userId: payload.sub, username: payload.username };
  }
}
