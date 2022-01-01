import { Module } from '@nestjs/common';
import { ScrapingService } from './scraping/scraping.service';
import { ApiService } from './api/api.service';
import { DbService } from './db/db.service';
import { PrismaService } from '@/prisma.service';
import { DomainService } from './domain/domain.service';
import { ScheduleService } from './schedule/schedule.service';

@Module({
  providers: [
    ScrapingService,
    ApiService,
    DbService,
    PrismaService,
    DomainService,
    ScheduleService,
  ],
})
export class YoutubeModule {}
