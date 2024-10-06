import { IUserJWT } from '@app/modules/auth/interfaces/auth-payload.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as IUserJWT;
    return user.userId;
  },
);
