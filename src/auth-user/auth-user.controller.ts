import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';

@Controller('auth')
export class AuthUserController {
  constructor(private readonly authService: AuthUserService) {}

  @Post('signin')
  async authenticateUser(@Body() body: { email: string; token: string }): Promise<{ success: boolean; message: string }> {
    const { email, token } = body;

    if (!email || !token) {
      throw new UnauthorizedException("Email or token are missing!");
    }

    return await this.authService.authenticateUser(email, token);
  }
}
