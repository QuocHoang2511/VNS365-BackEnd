import { Module } from '@nestjs/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { ShopModule } from './shop/shop.module';
import { StoryModule } from './story/story.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DashboardModule, UsersModule, StoryModule, ShopModule],
})
export class AdminModule {}
