import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "../dto/auth-credential.dto";
import { User } from "../entity/user.entity";
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
       async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
           const { username, password } = authCredentialsDto;

           //salt + hash 사용하여 암호화
           const salt = await bcrypt.genSalt();
           const hashedPassword = await bcrypt.hash(password, salt);


           const user = this.create({ username, password: hashedPassword});
            //저장 및 error.code 23505(동일유저id) 에러캐치처리
           try {
               await this.save(user);
            } catch (error) {
                if (error.code == '23505') {
                    throw new ConflictException('Existing username');
                } else {
                    throw new InternalServerErrorException();
                }
            //    console.log('error',error);
           }
    }
}