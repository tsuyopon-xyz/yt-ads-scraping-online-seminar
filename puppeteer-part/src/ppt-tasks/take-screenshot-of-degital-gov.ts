import * as puppeteer from 'puppeteer';
import { wait } from '../utils/wait';

export const takeScreenshotOfDegitalGov = async () => {
  const windowSize = {
    width: 1920,
    height: 1080,
  };

  const browser = await puppeteer.launch({
    // GUIのブラウザを起動したくない場合はtrueにする（ヘッドレスモード）
    headless: true,
    defaultViewport: {
      width: windowSize.width,
      height: windowSize.height,
    },
    args: [`--window-size=${windowSize.width},${windowSize.height}`],
  });
  const page = await browser.newPage();
  await page.goto('https://www.digital.go.jp/');

  // デジタル帳のトップページはSPAで作られているため、
  // 少し待たないとスクリーンショットが真っ白になるときがある
  // await page.waitForFunction(
  //   'document.querySelector("body").innerText.includes("デジタル庁")'
  // );
  await page.waitForSelector('.sd', {
    visible: true,
  });

  // DOMに `.sd` の要素が見つかっても完璧に表示されないときもあるため、
  // 表示が完了する（であろう）ミリ秒数待つ
  await wait(200);

  await page.screenshot({
    path: './screenshot.jpeg',
    type: 'jpeg',
    fullPage: true,
  });
  await browser.close();
};
