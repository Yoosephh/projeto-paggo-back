import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUserRepository } from './auth-user.repository';

@Injectable()
export class AuthUserService {
  constructor(private readonly authRepository: AuthUserRepository) {}

  async authenticateUser(email: string, token: string): Promise<{ success: boolean; message: string }> {
    try {
      const existingUser = await this.authRepository.findUser(email);

      if (existingUser) {
        await this.authRepository.updateToken(email, token);
      } else {
        await this.authRepository.createUser(email, token);
      }
      return { success: true, message: 'User authentication succeded.' };
    } catch (error) {
      return { success: false, message: 'Internal Server Error' };
    }
  }

  async validateToken(token: string) {

    const user = await this.authRepository.findUserByToken(token);
    if (!user) {
      throw new UnauthorizedException('Invalid token.');
    }
    return user;
  }
}
