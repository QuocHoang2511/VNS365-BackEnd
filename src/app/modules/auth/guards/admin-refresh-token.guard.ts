import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAdminAuthRefreshGuard extends AuthGuard('admin-jwt-refresh') {}
