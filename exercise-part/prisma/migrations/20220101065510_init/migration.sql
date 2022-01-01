-- CreateTable
CREATE TABLE "YouTube" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YouTube_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YouTubeSnippet" (
    "videoId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "channelTitle" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "liveBroadcastContent" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "YouTubeSnippet_pkey" PRIMARY KEY ("videoId")
);

-- CreateTable
CREATE TABLE "YouTubeStatistics" (
    "videoId" TEXT NOT NULL,
    "viewCount" TEXT NOT NULL,
    "likeCount" TEXT NOT NULL,
    "favoriteCount" TEXT NOT NULL,
    "commentCount" TEXT NOT NULL,

    CONSTRAINT "YouTubeStatistics_pkey" PRIMARY KEY ("videoId")
);

-- CreateTable
CREATE TABLE "YouTubeStatus" (
    "videoId" TEXT NOT NULL,
    "uploadStatus" TEXT NOT NULL,
    "privacyStatus" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "embeddable" BOOLEAN NOT NULL,
    "publicStatsViewable" BOOLEAN NOT NULL,
    "madeForKids" BOOLEAN NOT NULL,

    CONSTRAINT "YouTubeStatus_pkey" PRIMARY KEY ("videoId")
);

-- CreateTable
CREATE TABLE "YouTubeAdsLandingPage" (
    "videoId" TEXT NOT NULL,
    "landingPageUrl" TEXT NOT NULL,

    CONSTRAINT "YouTubeAdsLandingPage_pkey" PRIMARY KEY ("videoId")
);

-- AddForeignKey
ALTER TABLE "YouTubeSnippet" ADD CONSTRAINT "YouTubeSnippet_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "YouTube"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YouTubeStatistics" ADD CONSTRAINT "YouTubeStatistics_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "YouTube"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YouTubeStatus" ADD CONSTRAINT "YouTubeStatus_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "YouTube"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YouTubeAdsLandingPage" ADD CONSTRAINT "YouTubeAdsLandingPage_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "YouTube"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
