import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Public()
  @Get('confirm/:token')
  confirmEmail(@Param('token') token: string) {
    return this.auth.confirmEmail(token);
  }

  @Public()
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Public()
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  refresh(@CurrentUser() user: { id: number; email: string }) {
    return this.auth.refresh(user.id, user.email);
  }

  @Post('logout')
  logout() {
    return this.auth.logout();
  }

  @Public()
  @Post('resend-confirmation')
  resendConfirmation(@Body('email') email: string) {
    return this.auth.resendConfirmation(email);
  }
}
