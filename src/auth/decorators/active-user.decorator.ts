import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUES_USER_KEY } from '../constants/auth.constants';
import { ActiveUserType } from '../types/ActiveUserType';

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserType | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ActiveUserType = request[REQUES_USER_KEY];
    return field ? user?.[field] : user;
  },
);
