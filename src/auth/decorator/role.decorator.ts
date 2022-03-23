import { SetMetadata } from "@nestjs/common";
import { RoleType } from "../role-type";


//...은 하나씩 넣어주는것
export const Roles = (...roles: RoleType[]): any => SetMetadata('roles', roles);