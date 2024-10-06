import { JwtAdminAuthGuard } from '@app/modules/auth/guards/admin-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ShopService } from './shop.service';

@Controller('admin/shop')
export class ShopController {
  constructor(private readonly service: ShopService) {}
  @UseGuards(JwtAdminAuthGuard)
  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('perPage') perPage = 20,

    @Query('id') id?: number,
    @Query('name') name?: string,
    @Query('status') status?: string,
    @Query('province') province?: string,
  ) {
    return this.service.findAll({
      page: +page,
      perPage: +perPage,
      province,
      filter: { id: Number(id), name, status },
    });
  }

  @UseGuards(JwtAdminAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Post()
  create(@Body() createTaskDto: any) {
    return this.service.create({
      ...createTaskDto,
    });
  }

  @UseGuards(JwtAdminAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: any) {
    return this.service.update(+id, updateTaskDto);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Patch(':id/food')
  updateFood(@Param('id') id: string, @Body() data: any) {
    return this.service.updateFood(+id, data.foods);
  }
}
