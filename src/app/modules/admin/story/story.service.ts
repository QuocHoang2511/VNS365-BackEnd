import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class StoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, createDto: any) {
    const data = await this.prismaService.story.create({
      data: {
        ...createDto,
        region_id: +createDto.region_id,
        user_id: userId,
        status: 'APPROVED',
      },
    });

    return data;
  }

  async findAll({
    page,
    perPage,
    filter,
    region,
  }: {
    page: number;
    perPage: number;
    region?: string;
    filter: { id?: number; name?: string; status?: string };
  }) {
    const newFilter = Object.entries(filter).reduce((acc, [key, value]) => {
      if (value) {
        switch (key) {
          case 'id':
            acc[key as any] = Number(value);
            break;
          case 'status':
            acc[key as any] = value;
            break;
          case 'name':
            acc['title'] = {
              contains: value,
              mode: 'insensitive',
            };
            break;
          default:
            acc[key as any] = {
              contains: value,
              mode: 'insensitive',
            };
            break;
        }
      }

      return acc;
    }, {} as any);

    const [total, data] = await Promise.all([
      this.prismaService.story.count({
        where: {
          region: {
            name: region,
          },
          ...newFilter,
        },
      }),
      this.prismaService.story.findMany({
        where: {
          region: {
            name: region,
          },
          ...newFilter,
        },
        include: {
          region: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        skip: page && perPage ? (page - 1) * perPage : undefined,
        take: page && perPage ? perPage : undefined,
      }),
    ]);

    return {
      data: data,
      meta: {
        currentPage: page,
        perPage,
        total: total ?? 0,
        totalPages: Math.ceil((total ?? 0) / perPage),
      },
    };
  }

  async findOne(id: number) {
    const data = await this.prismaService.story.findUnique({
      where: {
        id,
      },
      include: {
        region: true,
        comments: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return data;
  }

  async update(id: number, updateDto: any) {
    const data = await this.prismaService.story.update({
      where: {
        id,
      },
      data: updateDto,
    });

    return data;
  }

  async updateStatus(id: number, updateDto: any) {
    const data = await this.prismaService.story.update({
      where: {
        id,
      },
      data: {
        status: updateDto.status,
      },
    });

    return data;
  }

  remove(id: number) {
    return this.prismaService.story.delete({
      where: {
        id,
      },
    });
  }
}
