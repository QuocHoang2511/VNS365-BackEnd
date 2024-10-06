import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    const [totalAccounts, totalAdmins, totalUsers, totalStory] =
      await Promise.all([
        this.getTotalAccounts(),
        this.getTotalAdmins(),
        this.getTotalUsers(),
        this.getTotalStory(),
      ]);

    return {
      totalUsers,
      totalAdmins,
      totalAccounts,
      totalStory,
    };
  }

  async getTotalAccounts() {
    return this.prismaService.user.count();
  }

  async getTotalAdmins() {
    return this.prismaService.user.count({
      where: {
        role: 'ADMIN',
      },
    });
  }

  async getTotalUsers() {
    return this.prismaService.user.count({
      where: {
        role: 'USER',
      },
    });
  }

  async getTotalStory() {
    return this.prismaService.story.count({
      where: {
        status: {
          in: ['PENDING', 'APPROVED'],
        },
      },
    });
  }
}
