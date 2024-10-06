import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { JWT_CONSTANTS } from 'src/utils/constants';
import { LoginDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        address: true,
        phone_number: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const isMatch = user?.password == password;

    if (!isMatch) {
      throw new BadRequestException('Password is incorrect.');
    }

    const token = await this.generateToken(user.id, user.name);

    await this.prisma.user.update({
      where: { email },
      data: {
        refresh_token: token.refreshToken,
      },
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone_number: user.phone_number,
        role: user.role,
      },
      ...token,
    };
  }

  async logout(userId: number) {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: { refresh_token: null },
      });

      return { message: 'Logout successfully' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async me(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          address: true,
          phone_number: true,
          role: true,
        },
      });

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async favorites(userId: number) {
    try {
      const favorites = await this.prisma.story.findMany({
        where: {
          userLikeStory: {
            some: {
              user_id: userId,
            },
          },
        },
        include: {
          region: {
            select: {
              name: true,
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
      });

      return favorites;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async changePassword(userId: number, changePasswordDto: any) {
    try {
      const { currentPassword, newPassword } = changePasswordDto;

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException('Không tìm thấy user');
      }

      if (user.password !== currentPassword) {
        throw new BadRequestException('Mật khẩu hiện tại không đúng');
      }

      await this.prisma.user.update({
        where: { id: userId },
        data: {
          password: newPassword,
        },
      });

      return { message: 'Đổi mật khẩu thành công' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async generateToken(adminId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: adminId,
          username,
        },
        {
          secret: JWT_CONSTANTS.ADMIN_ACCESS_TOKEN_SECRET,
          expiresIn: JWT_CONSTANTS.ADMIN_ACCESS_TOKEN_EXPIRES_IN,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: adminId,
          username,
        },
        {
          secret: JWT_CONSTANTS.ADMIN_REFRESH_TOKEN_SECRET,
          expiresIn: JWT_CONSTANTS.ADMIN_REFRESH_TOKEN_EXPIRES_IN,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(id: number, refreshToken: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: id },
      });

      if (!user) {
        throw new NotFoundException('user not found');
      }

      if (!user?.refresh_token) {
        throw new BadRequestException('Refresh token fail!.');
      }

      const isMatch = user?.refresh_token == refreshToken;

      if (!isMatch) {
        throw new BadRequestException('Token invalid.');
      }

      const newAccessToken = await this.jwtService.signAsync(
        {
          sub: user.id,
          username: user.name,
        },
        {
          secret: JWT_CONSTANTS.ADMIN_ACCESS_TOKEN_SECRET,
          expiresIn: JWT_CONSTANTS.ACCESS_TOKEN_EXPIRES_IN,
        },
      );

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async register(dto: any) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: dto.email,
        },
      });

      if (user) {
        throw new BadRequestException('Email đã tồn tại');
      }

      const newUser = await this.prisma.user.create({
        data: {
          ...dto,
        },
      });

      return newUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
