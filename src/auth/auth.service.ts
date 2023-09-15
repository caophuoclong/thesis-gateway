import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}
    async generateToken(
        data: Record<string, any>,
        type: 'access' | 'refresh' = 'access',
    ) {
        if (type === 'refresh')
            return this.jwtService.sign(data, {
                expiresIn: '30d',
            });
        return this.jwtService.sign(data);
    }
    async verifyToken(token: string) {
        return this.jwtService.verify(token);
    }
}
