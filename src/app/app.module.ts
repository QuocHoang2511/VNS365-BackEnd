import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { ConfigModule } from '@nestjs/config';
import configurations from './configurations';
import { AdminModule } from './modules/admin/admin.module';
import { AdminAuthModule } from './modules/auth/auth.module';
import { CommentModule } from './modules/comment/comment.module';
import { ShopModule } from './modules/shop/shop.module';
import { StoryModule } from './modules/story/story.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configurations],
    }),
    AdminModule,
    AdminAuthModule,
    StoryModule,
    UsersModule,
    CommentModule,
    ShopModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
