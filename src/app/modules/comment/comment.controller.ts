import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUserId } from 'src/shared/decorators';
import { JwtAdminAuthGuard } from '../auth/guards/admin-auth.guard';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('perPage') perPage = 20,

    @Query('id') id?: number,
    @Query('name') name?: string,
    @Query('status') status?: string,
    @Query('region') region?: string,
  ) {
    return this.service.findAll({
      page: +page,
      perPage: +perPage,
      region,
      filter: { id: Number(id), name, status },
    });
  }

  @Get(':id/story')
  findAllByStoryId(@Param('id') id: string) {
    return this.service.findAllByStoryId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Post()
  create(@Body() createTaskDto: any, @GetCurrentUserId() userId: number) {
    return this.service.create(userId, {
      ...createTaskDto,
    });
  }

  @UseGuards(JwtAdminAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
