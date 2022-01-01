import { Injectable, Logger } from '@nestjs/common';
import { ScrapingService } from '../scraping/scraping.service';
import { ApiService } from '../api/api.service';
import { DbService } from '../db/db.service';

@Injectable()
export class DomainService {
  private readonly logger = new Logger(DomainService.name);

  constructor(
    private readonly scrapingService: ScrapingService,
    private readonly apiService: ApiService,
    private readonly dbService: DbService,
  ) {}

  async fetchAndSaveYouTubeAdsData(sourceVideoId: string): Promise<void> {
    const { videoId, landingPageUrl } = await this.scrapingService.scrape(
      sourceVideoId,
    );

    if (!videoId || videoId === sourceVideoId) {
      // 広告動画を取得できなかったときの処理
      this.logger.debug('Not found Ads video.');
      return;
    } else if (videoId !== sourceVideoId && !landingPageUrl) {
      // 広告動画を取得できたが、LPのURLを取得できなかったときの処理
      this.logger.debug('Not found Ads LP.');
      return;
    }
    this.logger.debug('Found Ads videos and LP.');

    const dataInDB = await this.dbService.findOne(videoId);
    if (dataInDB) {
      this.logger.log(`Data exists in DB. (${videoId})`);
      return;
    }

    try {
      const videoDataFromAPI = await this.apiService.getVideo(videoId);
      const inputData = {
        id: videoId,
        snippet: {
          create: {
            channelId: videoDataFromAPI.snippet.channelId ?? '',
            title: videoDataFromAPI.snippet.title ?? '',
            description: videoDataFromAPI.snippet.description ?? '',
            thumbnail:
              videoDataFromAPI.snippet.thumbnails?.maxres?.url ||
              videoDataFromAPI.snippet.thumbnails?.standard?.url ||
              videoDataFromAPI.snippet.thumbnails?.high?.url ||
              videoDataFromAPI.snippet.thumbnails?.medium?.url ||
              videoDataFromAPI.snippet.thumbnails?.default?.url ||
              '',
            channelTitle: videoDataFromAPI.snippet.channelTitle ?? '',
            tags: Array.isArray(videoDataFromAPI.snippet.tags)
              ? videoDataFromAPI.snippet.tags.join(',')
              : '',
            categoryId: videoDataFromAPI.snippet.categoryId ?? '',
            liveBroadcastContent:
              videoDataFromAPI.snippet.liveBroadcastContent ?? '',
            publishedAt: videoDataFromAPI.snippet.publishedAt ?? '',
          },
        },
        statistics: {
          create: {
            viewCount: videoDataFromAPI.statistics.viewCount ?? '',
            likeCount: videoDataFromAPI.statistics.likeCount ?? '',
            favoriteCount: videoDataFromAPI.statistics.favoriteCount ?? '',
            commentCount: videoDataFromAPI.statistics.favoriteCount ?? '',
          },
        },
        status: {
          create: {
            uploadStatus: videoDataFromAPI.status.uploadStatus ?? '',
            privacyStatus: videoDataFromAPI.status.privacyStatus ?? '',
            license: videoDataFromAPI.status.license ?? '',
            embeddable: videoDataFromAPI.status.embeddable ?? false,
            publicStatsViewable:
              videoDataFromAPI.status.publicStatsViewable ?? false,
            madeForKids: videoDataFromAPI.status.madeForKids ?? false,
          },
        },
        adsLandingPage: {
          create: {
            landingPageUrl,
          },
        },
      };
      await this.dbService.createAllRelatedData(inputData);
      this.logger.log('Added new data.');
    } catch (error) {
      this.logger.error({ videoId, error: (error as Error).message });
    }
  }
}
