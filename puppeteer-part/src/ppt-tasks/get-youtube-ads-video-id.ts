import * as puppeteer from 'puppeteer';
import { wait } from '../utils/wait';

// 広告が流れる動画のIDをセットする（例: THE FIRST TAKEの動画）
// 毎回広告が流れるわけではないことに注意する
const SOURCE_VIDEO_ID = 'G4zbSlU9XFY';
const YOUTUBE_PREFIX_URL = 'https://www.youtube.com/watch?v=';

export const getYoutubeAdsVideoId = async () => {
  const windowSize = {
    width: 800,
    height: 600,
  };

  const browser = await puppeteer.launch({
    // GUIのブラウザを起動したくない場合はtrueにする（ヘッドレスモード）
    headless: true,
    defaultViewport: {
      width: windowSize.width,
      height: windowSize.height,
    },
    args: [
      `--window-size=${windowSize.width},${windowSize.height}`,
      '--lang=ja-JP,ja',
    ],
  });

  try {
    const gotVideoId = await _scrapeAdsVideoId(browser, SOURCE_VIDEO_ID);
    console.log('取得した動画ID : ', gotVideoId);
    console.log('広告動画? : ', gotVideoId !== SOURCE_VIDEO_ID);
  } catch (error) {
    console.error('Error: _scrapeAdsVideoId : ', error);
  }

  await browser.close();
};

const _scrapeAdsVideoId = async (
  browser: puppeteer.Browser,
  videoId: string
): Promise<string | null> => {
  const url = YOUTUBE_PREFIX_URL + videoId;
  const page = await browser.newPage();

  await _closeFirstPage(browser);
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'ja' });
  await page.goto(url, { waitUntil: ['load'] });

  await page.click('.ytp-play-button');
  await page.click('.ytp-play-button');
  await page.click('.html5-video-player', {
    button: 'right',
  });

  await page.waitForSelector('.ytp-menuitem-label');
  const targetIndex = await page.$$eval('.ytp-menuitem-label', (elements) => {
    let targetIndex = -1;
    elements.forEach((el, index) => {
      if (
        //取得したいメニューのタイトルが「日本語」でも「英語でも」取得できるようにする
        el.textContent?.includes('Stats for nerds') ||
        el.textContent?.includes('詳細統計情報')
      ) {
        targetIndex = index;
      }
    });
    return targetIndex;
  });

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
    }
  );

  return youtubeId;
};

const _closeFirstPage = async (browser: puppeteer.Browser): Promise<void> => {
  const pages = await browser.pages();
  const firstPage = pages[0];
  await firstPage.close();
};
