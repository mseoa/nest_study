import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';

export const JwtSecret = 'zjP9h6ZI5LoSKCRj1212'

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: JwtSecret,
      signOptions: { expiresIn: '5m'}
    }),
    UsersModule, // UsersService is being used in the JwtStrategy class
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy] // Now the JwtStrategy can be used by other modules, injection할 class
})
export class AuthModule {}
