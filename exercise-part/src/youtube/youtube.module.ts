import { Module } from '@nestjs/common';
import { ScrapingService } from './scraping/scraping.service';

@Module({
  providers: [ScrapingService],
})
export class YoutubeModule {}
