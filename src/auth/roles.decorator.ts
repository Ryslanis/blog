import { Reflector } from "@nestjs/core";
import { Roles as RoleType } from "src/utils/types";

export const Roles = Reflector.createDecorator<RoleType[]>();