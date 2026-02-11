import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../../users/entities/user.entity';

interface AuthRequest extends Request {
  user: User;
}

export const CurrentUser = createParamDecorator(
  <K extends keyof User | undefined>(
    data: K,
    ctx: ExecutionContext,
  ): K extends keyof User ? User[K] : User => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();
    const user = request.user;

    if (data) {
      return user[data] as K extends keyof User ? User[K] : never;
    }

    return user as K extends keyof User ? never : User;
  },
);
