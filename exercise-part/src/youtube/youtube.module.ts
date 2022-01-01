import { Module } from '@nestjs/common';
import { ScrapingService } from './scraping/scraping.service';
import { ApiService } from './api/api.service';

@Module({
  providers: [ScrapingService, ApiService],
})
export class YoutubeModule {}
