
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // const roles = this.reflector.get(Roles, context.getHandler());
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass()
    ])

    if (!requiredRoles.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user.roles?.some(role => requiredRoles.includes(role.name));
  }
}