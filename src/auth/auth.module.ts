import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './repository/user.repository';
import * as config from 'config';
import { UserAuthorityRepository } from './repository/user-authority.repository';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn
      }
    }),
    TypeOrmModule.forFeature([UserRepository, UserAuthorityRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  //다른모듈에서 사용해주기위해 exports에 넣어줌
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
