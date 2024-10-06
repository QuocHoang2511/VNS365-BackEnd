import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, createDto: any) {
    console.log(createDto);

    const data = await this.prismaService.comment.create({
      data: {
        ...createDto,
        story_id: +createDto.story_id,
        user_id: userId,
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
      this.prismaService.comment.count({
        where: {
          region: {
            name: region,
          },
          ...newFilter,
        },
      }),
      this.prismaService.comment.findMany({
        where: {
          region: {
            name: region,
          },
          ...newFilter,
        },
        include: {
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
    const data = await this.prismaService.comment.findUnique({
      where: {
        id,
      },
    });

    return data;
  }

  async findAllByStoryId(storyId: number) {
    const data = await this.prismaService.comment.findMany({
      where: {
        story_id: storyId,
      },
      include: {
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
    const data = await this.prismaService.comment.update({
      where: {
        id,
      },
      data: updateDto,
    });

    return data;
  }

  remove(id: number) {
    return this.prismaService.comment.delete({
      where: {
        id,
      },
    });
  }
}
