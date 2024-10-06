import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';

@Module({
  imports: [PrismaModule],
  controllers: [StoryController],
  providers: [StoryService],
})
export class StoryModule {}
