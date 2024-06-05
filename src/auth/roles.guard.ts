
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles: string[] = this.reflector.get(Roles, context.getHandler());

    if (!requiredRoles?.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    
    // Check user's roles
    const user = request.user;
    return user.roles?.some(role => requiredRoles.includes(role.name));
  }
}
