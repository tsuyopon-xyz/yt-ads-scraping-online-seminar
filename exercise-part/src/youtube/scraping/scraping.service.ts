import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { wait } from '@/utils/wait';

type VideoId = string | null;
type LandingPageUrl = string | null;

type ScrapedResult = {
  videoId: VideoId;
  landingPageUrl: LandingPageUrl;
};

const YOUTUBE_PREFIX_URL = 'https://www.youtube.com/watch?v=';

@Injectable()
export class ScrapingService {
  private readonly logger = new Logger(ScrapingService.name);

  /**
   *
   * @param {string} sourceVideoId - 冒頭に広告が表示される動画のIDをセットする
   * @returns {ScrapedResult}
   */
  async scrape(sourceVideoId: string): Promise<ScrapedResult> {
    let browser;
    let scrapedVideoId: VideoId = null;
    let landingPageUrl: LandingPageUrl = null;

    try {
      browser = await _createBrowser();
      scrapedVideoId = await _scrapeAdsVideoId(browser, sourceVideoId);
    } catch (error) {
      this.logger.error(error);
    }

    // 広告動画ではないため、LPページの取得処理行わないで処理を終了
    if (!scrapedVideoId || scrapedVideoId === sourceVideoId) {
      console.log('Not Found Ads video.');
      if (browser) {
        await browser.close();
      }

      return {
        videoId: scrapedVideoId,
        landingPageUrl,
      };
    }
    console.log('Found Ads video.');

    try {
      landingPageUrl = await _getLandingPageUrl(browser);
    } catch (error) {
      this.logger.error(error);
    }

    await browser.close();

    return {
      videoId: scrapedVideoId,
      landingPageUrl,
    };
  }
}

const _createBrowser = async (): Promise<puppeteer.Browser> => {
  // https://pptr.dev/#?product=Puppeteer&show=api-puppeteerlaunchoptions
  const browser = await puppeteer.launch({
    headless: true,

    // https://dev.to/ziv/running-puppeteer-on-heroku-free-tier-e7b
    // https://peter.sh/experiments/chromium-command-line-switches/
    args: [
      '--incognito',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--lang=ja',
    ],
  });

  return browser;
};

const _scrapeAdsVideoId = async (
  browser: puppeteer.Browser,
  videoId: string,
): Promise<string> => {
  const url = YOUTUBE_PREFIX_URL + videoId;
  const page = await browser.newPage();

  await _closeFirstPage(browser);
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'ja' });

  await page.goto(url, { waitUntil: ['load'] });
  await page.click('.ytp-play-button');
  await page.click('.ytp-play-button');
  await page.click('.html5-video-player', { button: 'right' });
  await page.waitForSelector('.ytp-menuitem-label');

  const targetIndex: number = await page.$$eval(
    '.ytp-menuitem-label',
    (elements) => {
      // この中はPuppeteerで開いたブラウザ内の環境でJavaScriptが実行されるため、
      // このスコープの外の変数にアクセスすることはできない。
      // 以下を実行すると「url is not defined」となる。
      // alert(url);

      let targetIndex = -1;
      elements.forEach((el, index) => {
        if (
          el.textContent?.includes('Stats for nerds') ||
          el.textContent?.includes('詳細統計情報')
        ) {
          targetIndex = index;
        }
      });
      return targetIndex;
    },
  );

  if (targetIndex === -1) {
    return null;
  }

  const targetElement = (await page.$$('.ytp-menuitem-label'))[targetIndex];
  targetElement.click();

  // Wait for showing detail panel after Clicking '詳細統計情報'
  await wait(1000);

  const youtubeId: string | null = await page.$eval(
    '.html5-video-info-panel-content',
    (element) => {
      const divElements = Array.from(element.querySelectorAll('div'));
      const targetDiv = divElements
        .filter((div) => div.textContent?.includes('Video ID'))
        .filter((div) => div.querySelector('span'))[0];
      const targetSpan = targetDiv.querySelector('span');
      const trimmedTexts = targetSpan?.textContent
        ?.split('/')
        .map((str) => str.trim());
      if (Array.isArray(trimmedTexts) && trimmedTexts.length > 0) {
        const youtubeId = trimmedTexts[0];
        return youtubeId;
      } else {
        return null;
      }
    },
  );

  return youtubeId;
};

const _getFirstPage = async (
  browser: puppeteer.Browser,
): Promise<puppeteer.Page> => {
  const pages = await browser.pages();
  const firstPage = pages[0];
  return firstPage;
};

const _closeFirstPage = async (browser: puppeteer.Browser): Promise<void> => {
  const pages = await browser.pages();
  const firstPage = pages[0];
  await firstPage.close();
};

const _getLandingPageUrl = async (
  browser: puppeteer.Browser,
): Promise<LandingPageUrl> => {
  const page = await _getFirstPage(browser);
  let lpUrl: LandingPageUrl = null;

  console.log('Started to get LP URL!!!');
  await page.waitForSelector('.ytp-ad-button', {
    visible: true,
    timeout: 10000,
  });

  // 1つ目、2つ目のボタンをクリックしてもLPに遷移できなかったが、
  // 3つ目のボタンをクリックしたらLPに遷移できたのを確認した
  const adsButton = (await page.$$('.ytp-ad-button'))[2];
  if (adsButton) {
    console.log('Found Ads Button.');
    const [newPage] = await Promise.all([
      browser
        .waitForTarget((t) => t.opener() === page.target())
        .then((t) => t.page()),
      adsButton.click().then(() => {
        // console.log('Clicked Ads Button.');
      }),
    ]);
    lpUrl = await new Promise((resolve) => {
      newPage.once('load', async () => {
        const frame = newPage.mainFrame();
        const url = frame.url();
        resolve(url);
      });
    });
  } else {
    console.log('Not Founded Ads Button.');
  }
  console.log('Finished to get LP URL!!!');

  return lpUrl;
};
