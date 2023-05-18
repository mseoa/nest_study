import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './entity/auth.entity';
import * as bycrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService){}

    async login(email: string, password: string): Promise<AuthEntity>{
        const user = await this.prisma.user.findUnique({where: {email}})

        if (!user){
            throw new NotFoundException(`email이 ${email}인 사용자가 없습니다.`)
        }

        // Check if the password is correct
        // const isPasswordValid = user.password === password;
        const isPasswordValid = await bycrypt.compare(password, user.password);

        if (!isPasswordValid){
            throw new UnauthorizedException('비밀번호가 일치하지 않습니다.')
        }

        return {
            accessToken: this.jwtService.sign({ userId: user.id })
        }
    }
}
