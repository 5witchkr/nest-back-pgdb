import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from  'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}
    //회원가입
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    //로그인
    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const { username, password} = authCredentialsDto;
        const user = await this.userRepository.findOne({ username });

        //bcrypt compare로 비밀번호 대조
        if (user && (await bcrypt.compare(password, user.password))) {
            //유저 토큰생성 (secret + payload)
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };
        } else {
            throw new UnauthorizedException('login failed');
        }
    }
}
