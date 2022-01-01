import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  const videoId = 'G4zbSlU9XFY';
  const timeout = 1000 * 40;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [ApiService],
    }).compile();

    service = module.get<ApiService>(ApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  xit(
    'YouTbe Data APIの動作確認用に作ったテスト（確認が済んだら "xit" でテストが実行されないようにする）',
    async () => {
      const videoData = await service.getVideo(videoId);

      console.log({ videoData });
    },
    timeout,
  );
});
