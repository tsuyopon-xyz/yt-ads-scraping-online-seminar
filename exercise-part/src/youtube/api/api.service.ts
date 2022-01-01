import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiService {
  private readonly logger = new Logger(ApiService.name);

  async getVideo(videoId: string): Promise<VideoData> {
    this.logger.debug('Started the getVideo method');
    const endpoint = 'https://www.googleapis.com/youtube/v3/videos';

    const response = await axios.get(endpoint, {
      method: 'GET',
      params: {
        id: videoId,
        key: process.env.YOUTUBE_API_KEY,
        part: 'snippet,statistics,status',
        // fieldsを使うとレスポンスデータを絞ることができる（→レスポンスデータ量が減るため少し軽くなる）
        // https://developers.google.com/youtube/v3/getting-started#fields
        fields: 'items(id,snippet,statistics,status)',
      },
    });

    const data = response.data as ResponseFormat;
    const videoData = data.items[0];

    this.logger.debug('Finished the getVideo method');

    return videoData;
  }
}

type VideoData = {
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
      standard: {
        url: string;
        width: number;
        height: number;
      };
      maxres: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    categoryId: string;
    liveBroadcastContent: string;
    tags: string[];
    localized: {
      title: string;
      description: string;
    };
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: false;
    contentRating: object;
    projection: string;
  };
  status: {
    uploadStatus: string;
    privacyStatus: string;
    license: string;
    embeddable: boolean;
    publicStatsViewable: boolean;
    madeForKids: boolean;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
};

type ResponseFormat = {
  items: VideoData[];
};
