import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAdminAuthGuard } from '../auth/guards/admin-auth.guard';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private readonly service: ShopService) {}

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('perPage') perPage = 20,

    @Query('id') id?: number,
    @Query('nameFood') nameFood?: string,
    @Query('status') status?: string,
    @Query('province') province?: string,
  ) {
    return this.service.findAll({
      page: +page,
      perPage: +perPage,
      province,
      nameFood,
      filter: { id: Number(id), status },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Post('recommend')
  create(@Body() createTaskDto: any) {
    return this.service.create(createTaskDto);
  }
}
