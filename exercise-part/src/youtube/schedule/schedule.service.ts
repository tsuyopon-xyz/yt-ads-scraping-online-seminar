import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DomainService } from '../domain/domain.service';

// 冒頭で広告が流れる動画IDをセットする
const SOURCE_VIDEO_ID = 'G4zbSlU9XFY';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);
  constructor(private readonly domainService: DomainService) {}

  @Cron('0 * * * * *')
  async scheduleForDomainOfFetchAndSaveYouTubeAdsData() {
    this.logger.debug('Started "fetchAndSaveYouTubeAdsData"');
    await this.domainService.fetchAndSaveYouTubeAdsData(SOURCE_VIDEO_ID);
    this.logger.debug('Finished "fetchAndSaveYouTubeAdsData"');
  }
}
