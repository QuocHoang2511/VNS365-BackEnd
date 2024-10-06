import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class ShopService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: any) {
    const data = await this.prismaService.shop.create({
      data: {
        ...createDto,
      },
    });

    return data;
  }

  async findAll({
    page,
    perPage,
    filter,
    province,
    nameFood,
  }: {
    page: number;
    perPage: number;
    province?: string;
    nameFood?: string;
    filter: { id?: number; status?: string };
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

    let condition = {};

    if (province) {
      condition = Object.assign(condition, {
        province_id: +province,
      });
    }

    if (nameFood) {
      condition = Object.assign(condition, {
        shopFoods: {
          some: {
            food: {
              contains: nameFood,
              mode: 'insensitive',
            },
          },
        },
      });
    }

    const [total, data] = await Promise.all([
      this.prismaService.shop.count({
        where: {
          status: 'APPROVED',
          ...condition,
          ...newFilter,
        },
      }),
      this.prismaService.shop.findMany({
        where: {
          status: 'APPROVED',
          ...condition,
          ...newFilter,
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
    const data = await this.prismaService.shop.findUnique({
      where: {
        id,
      },
    });

    return data;
  }
}
