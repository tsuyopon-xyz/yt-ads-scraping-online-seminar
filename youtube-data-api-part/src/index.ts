import * as Dotenv from 'dotenv';
import axios from 'axios';

Dotenv.config();

(async () => {
  // 例: 「布袋寅泰 - バンビーナ / THE FIRST TAKE」のvideoIdの場合
  const url = 'https://www.googleapis.com/youtube/v3/videos';
  const videoId = 'G4zbSlU9XFY';

  const response = await axios.get(url, {
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

  const data = response.data;

  // console.log(data);

  // dataの中身が全部見れない場合は以下のログを出力する
  console.log(JSON.stringify(data, null, 2));
})();
