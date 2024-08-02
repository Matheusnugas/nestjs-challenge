import { Injectable, UnauthorizedException } from '@nestjs/common';
import { auth } from '../firebase-admin';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from '../dto/register.dto';
import { User } from '@prisma/client';
import { LoginDto } from 'src/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(registerDto: RegisterDto, ip: string): Promise<object> {
    const { email, password, displayName } = registerDto;

    try {
      const userRecord = await auth.createUser({
        email,
        password,
        displayName,
      });

      await this.prisma.user.create({
        data: {
          authId: userRecord.uid,
          email,
          name: displayName,
          ip,
        },
      });

      return { uid: userRecord.uid };
    } catch (error) {
      throw new UnauthorizedException(
        'Error registering user: ' + error.message,
      );
    }
  }

  async getUserByAuthId(authId: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { authId },
    });
  }

  async login(loginDto: LoginDto): Promise<string> {
    const { email, password } = loginDto;

    throw new UnauthorizedException(
      'Login functionality should be handled on the client-side.',
    );
  }
}
