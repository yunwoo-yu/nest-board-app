import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Getuser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  return req.user;
});
