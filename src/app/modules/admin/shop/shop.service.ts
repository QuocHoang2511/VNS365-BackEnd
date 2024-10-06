import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class ShopService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: any) {
    const { foods, ...rest } = createDto;

    const data = await this.prismaService.shop.create({
      data: {
        ...rest,
        province_id: createDto.province_id,
        status: 'APPROVED',
      },
    });

    if (foods) {
      await this.prismaService.shopFood.createMany({
        data: foods.map((food: string) => ({
          shop_id: data.id,
          food,
        })),
      });
    }

    return data;
  }

  async findAll({
    page,
    perPage,
    filter,
    province,
  }: {
    page: number;
    perPage: number;
    province?: string;
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
      this.prismaService.shop.count({
        where: {
          ...newFilter,
          province: {
            name: province,
          },
        },
      }),
      this.prismaService.shop.findMany({
        where: {
          ...newFilter,
          province: {
            name: province,
          },
        },
        include: {},
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
      include: {
        shopFoods: true,
        province: true,
        region: true,
      },
    });

    return data;
  }

  async update(id: number, updateDto: any) {
    const data = await this.prismaService.shop.update({
      where: {
        id,
      },
      data: updateDto,
    });

    return data;
  }

  remove(id: number) {
    return this.prismaService.shop.delete({
      where: {
        id,
      },
    });
  }

  async updateFood(shopId: number, foodNames: string[]) {
    await this.prismaService.shopFood.deleteMany({
      where: {
        shop_id: shopId,
      },
    });

    await this.prismaService.shopFood.createMany({
      data: foodNames.map((name) => ({
        shop_id: shopId,
        food: name,
      })),
    });
  }
}
