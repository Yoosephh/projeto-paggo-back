import { Body, Controller, Post } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';

@Controller('auth-user')
export class AuthUserController {
  constructor(private readonly authService: AuthUserService) {}

  @Post('sign-in')
  async authenticateUser(@Body() body: { email: string; token: string }): Promise<{ success: boolean; message: string }> {
    const { email, token } = body;

    if (!email || !token) {
      return { success: false, message: "Email or token are missing." };
    }

    return await this.authService.authenticateUser(email, token);
  }
}
