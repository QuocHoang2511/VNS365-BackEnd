import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { GetCurrentUserId } from 'src/shared/decorators';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/auth.dto';
import { JwtAdminAuthGuard } from './guards/admin-auth.guard';
import { JwtAdminAuthRefreshGuard } from './guards/admin-refresh-token.guard';
import { IRefreshJWT } from './interfaces/auth-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Post('logout')
  async logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Get('me')
  async me(@GetCurrentUserId() userId: number) {
    return this.authService.me(userId);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Get('favorites')
  async favorites(@GetCurrentUserId() userId: number) {
    return this.authService.favorites(userId);
  }

  @UseGuards(JwtAdminAuthRefreshGuard)
  @Get('refresh')
  async refreshToken(@Req() req: Request) {
    const user = req.user as IRefreshJWT;

    const userId = user.userId;
    const refreshToken = user.refreshToken;

    return this.authService.refreshToken(userId, refreshToken);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Post('change-password')
  async changePassword(
    @GetCurrentUserId() userId: number,
    @Body() changePasswordDto: any,
  ) {
    return this.authService.changePassword(userId, changePasswordDto);
  }

  @Post('register')
  async register(@Body() dto: any) {
    return this.authService.register(dto);
  }
}
