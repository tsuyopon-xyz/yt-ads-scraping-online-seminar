import { Module } from '@nestjs/common';
import { ScrapingService } from './scraping/scraping.service';
import { ApiService } from './api/api.service';
import { DbService } from './db/db.service';
import { PrismaService } from '@/prisma.service';

@Module({
  providers: [ScrapingService, ApiService, DbService, PrismaService],
})
export class YoutubeModule {}
