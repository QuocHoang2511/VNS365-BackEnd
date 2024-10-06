import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('admin/dashboard')
export class DashboardController {
  constructor(private readonly service: DashboardService) {}

  @Get()
  findAll() {
    return this.service.getAll();
  }
}
