import { EntityRepository, Repository } from "typeorm";
import { UserAurhority } from "../entity/user-authority.entity";

@EntityRepository(UserAurhority)
export class UserAuthorityRepository extends Repository<UserAurhority> {}