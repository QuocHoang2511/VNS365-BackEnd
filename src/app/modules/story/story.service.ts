import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class StoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, createDto: any) {
    console.log(createDto);

    const data = await this.prismaService.story.create({
      data: {
        ...createDto,
        region_id: +createDto.region_id,
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
          status: 'APPROVED',
          region: {
            name: region,
          },
          ...newFilter,
        },
      }),
      this.prismaService.story.findMany({
        where: {
          status: 'APPROVED',
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
          comments: true,
          userLikeStory: {
            select: {
              user_id: true,
            },
          },
          _count: {
            select: {
              userLikeStory: true,
              comments: true,
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

    await this.prismaService.story.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
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

  interaction = async (userId: number, storyId: number, dto: any) => {
    const interaction = await this.prismaService.userLikeStory.findFirst({
      where: {
        user_id: userId,
        story_id: storyId,
      },
    });

    if (dto.status == 'LIKE') {
      if (interaction) {
        return interaction;
      }

      return this.prismaService.userLikeStory.create({
        data: {
          user_id: userId,
          story_id: storyId,
        },
      });
    } else {
      return this.prismaService.userLikeStory.deleteMany({
        where: {
          user_id: userId,
          story_id: storyId,
        },
      });
    }
  };

  remove(id: number) {
    return this.prismaService.story.delete({
      where: {
        id,
      },
    });
  }
}
