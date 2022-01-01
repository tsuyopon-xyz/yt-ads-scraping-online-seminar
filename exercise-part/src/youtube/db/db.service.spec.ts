import { Test, TestingModule } from '@nestjs/testing';
import { DbService } from './db.service';
import { PrismaService } from '@/prisma.service';
import { PrismaClient } from '@prisma/client';

describe('DbService', () => {
  let service: DbService;
  const timeout = 1000 * 40;
  const inputData = {
    id: 'dummy-videoId',
    snippet: {
      create: {
        channelId: 'dummy-channelId',
        title: 'dummy-title',
        description: 'dummy-description',
        thumbnail: 'https://example.com/dummy.png',
        channelTitle: 'dummy-channeil-title',
        tags: 'dummy-tag1,dummy-tag2,dummy-tag3',
        categoryId: 'dummy-category-id',
        liveBroadcastContent: 'dummy-content',
        publishedAt: '2021-12-03T13:00:12Z',
      },
    },
    statistics: {
      create: {
        viewCount: '1',
        likeCount: '2',
        favoriteCount: '3',
        commentCount: '4',
      },
    },
    status: {
      create: {
        uploadStatus: 'dummy-upload-status',
        privacyStatus: 'dummy-privacy-status',
        license: 'dummy-license',
        embeddable: false,
        publicStatsViewable: true,
        madeForKids: false,
      },
    },
    adsLandingPage: {
      create: {
        landingPageUrl: 'https://example.com/lp/dummy.html',
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbService, PrismaService],
    }).compile();

    service = module.get<DbService>(DbService);
  });

  beforeAll(async () => {
    await deleteAllRelatedDataById(inputData.id);
  });

  afterAll(async () => {
    await deleteAllRelatedDataById(inputData.id);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create and Find data', () => {
    it(
      '[Create]DBの動作確認用に作ったテスト（確認が済んだら "xit" でテストが実行されないようにする）',
      async () => {
        const resultOfCreate = await service.createAllRelatedData(inputData);

        console.log({ resultOfCreate });
      },
      timeout,
    );

    it(
      '[Find]DBの動作確認用に作ったテスト（確認が済んだら "xit" でテストが実行されないようにする）',
      async () => {
        const resultOfFindone = await service.findOne(inputData.id);

        console.log({ resultOfFindone });
      },
      timeout,
    );
  });
});

const deleteAllRelatedDataById = async (videoId) => {
  const prisma = new PrismaClient();
  const where = {
    videoId: videoId,
  };
  await prisma.$transaction([
    prisma.youTubeAdsLandingPage.deleteMany({ where }),
    prisma.youTubeSnippet.deleteMany({ where }),
    prisma.youTubeStatistics.deleteMany({ where }),
    prisma.youTubeStatus.deleteMany({ where }),
    prisma.youTube.deleteMany({
      where: {
        id: videoId,
      },
    }),
  ]);
  await prisma.$disconnect();
};
