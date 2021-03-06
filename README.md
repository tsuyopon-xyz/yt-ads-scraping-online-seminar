# 「Nest.js × Puppeteer × Supabase」で、YouTube 広告動画と LP を自動収集&保存するプログラム開発講座



## この講座が生まれた経緯

この講座は、僕が運営している「プログラミング学習系のコミュニティ・メルマガ・LINE」に、**「TypeScriptを使った、広告動画を自動収集するプログラムの実装方法に興味があればメッセージください」** と案内を出したことがきっかけで生まれました。

<br/>

案内に対して反応が全く無ければ、この講座を作ることは無かったのですが、複数の方から「興味ある」とメッセージをいただいたので、**「興味持ってくれる人がいるなら作るか！」** という気持ちで、今回の講座を作ることにしました。


<br/>


参考までに、**「どこで上記のような案内を出しているか？」** と興味を持たれる方もいらっしゃるかもしれないので、その情報を共有しておきます。

<br/>

主に、以下のところで上記のようなプログラミングの「勉強会」「講座」「相談会」の案内を出しています。

- メルマガ
  - [Web白熱教室](https://tsuyopon.xyz/lp/mail-magazine-training-course-for-beginner/)
- LINE公式アカウント
  - [Web白熱教室](https://tsuyopon.xyz/lp/mail-magazine/)
  - [JavaScript関数ドリル](https://js-drills.com/) 
  - [HTML&CSS速習教室](https://html-css-guide-five.vercel.app/)
  - [Webスキルスクール](https://web-skills-school.com/line-official-account/)
- [Front Hacks](https://tsuyopon.xyz/2021/02/20/fronthacks/)


<br/>

## この講座で学ぶこと


学ぶ内容は以下のとおりです。
最後の「演習課題」に向けて、利用する技術を1つずつステップアップ形式で学んでいきます。


<details>
<summary>1. NestJS</summary>
  
- バックエンドのWebフレームワーク。
- 定期実行の機能も持つ。
  
</details>

<details>
<summary>2. Puppeteer</summary>
  
- プログラムからブラウザを起動できる
- 通常のブラウザのように、ページ上の要素をクリックしたりスクロールもできる
- スクレイピングができる
  
</details>

<details>
<summary>3. Docker, Docker Compose, DBeaver</summary>
  
- Docker, Docker Composeを使って、開発環境ごとにローカルDBを用意する方法を学ぶ
- DBeaverを使って、DBの中身を確認する方法を学ぶ
  
</details>

<details>
<summary>4. Prisma</summary>
  
- プログラムからデータベースとやりとりができるライブラリ
- コマンドでDBにテーブルを作ったり、データをリセットするのも簡単なツール
  
</details>


<details>
<summary>5. Supabase</summary>
  
- Firebaseのようなバックエンド開発支援のWebサービス（BaaSの1つ）
- Firebaseとの大きな違いはRDBを使えること（FirebaseはNoSQL（Firestore））
- Firebaseと同じように無料でも使える
  
</details>

<details>
<summary>6. YouTube Data API</summary>
  
- YouTubeの操作を行えるAPI（動画、チャンネル、コメントなどの取得・作成・更新など）
- 講座では、Puppeteerを使って取得した広告動画のIDを使って、広告動画の詳細情報を取得する
  
</details>

<details>
<summary>7. 【演習課題】「定期的なYouTubeの広告動画のIDとLPのURLを自動収集→DB保存」のプログラム開発</summary>
  
- 上記の技術を学んだあとの集大成としての演習課題
- 上記各パートで実装する機能をうまく組み合わせることでできる
- 機能別に段階的に開発を進めるため、実践的な開発スキルも身につく
  
</details>

<br/>

## サンプルコード

先ほど紹介した各技術ごとにサンプルコードを用意しています。

学ぶ技術ごとにディレクトリを分けているので、必要に応じて学習の参考としてお使いください。

- [nestjs-part](https://github.com/tsuyopon-xyz/yt-ads-scraping-online-seminar/tree/main/nestjs-part) : 「NestJS」の解説で利用するサンプルコード
- [puppeteer-part](https://github.com/tsuyopon-xyz/yt-ads-scraping-online-seminar/tree/main/puppeteer-part) : 「Puppeteer」の解説で利用するサンプルコード
- [docker-part](https://github.com/tsuyopon-xyz/yt-ads-scraping-online-seminar/tree/main/docker-part) : 「Docker, Docker Compose, DBeaver」の解説で利用するサンプルコード
- [prisma-part](https://github.com/tsuyopon-xyz/yt-ads-scraping-online-seminar/tree/main/prisma-part) : 「Prisma」「Supabase」の解説で利用するサンプルコード
- [youtube-data-api-part](https://github.com/tsuyopon-xyz/yt-ads-scraping-online-seminar/tree/main/youtube-data-api-part) : 「YouTube Data API」の解説で利用するサンプルコード
- [exercise-part](https://github.com/tsuyopon-xyz/yt-ads-scraping-online-seminar/tree/main/exercise-part) : 「演習課題」の解説で利用するサンプルコード

<br/>

## 解説動画

この開発講座の解説動画は再生リストとしてまとめています。
再生リストは以下のリンクから確認できます。

- [YouTubeの広告情報を自動収集する開発講座（再生リスト）](https://www.youtube.com/playlist?list=PLgNEd6Q0CH8ETUWGzTY-n7goNAqn22cLe)


<br/>

## 解説動画内で使っている解説ページを見たい場合

解説動画で使っている解説ページのリンクは、メールでお渡ししています。
ページも使って学習をしたい方は、ぜひこちらから受け取っていただけたらと思います。

- [解説ページのリンクを受け取る](https://automation001.jp/p/r/TPNKhF0I) 

<br/>

## 個別サポートを受けたい方向け

- 学習に行き詰まった
- エラー対応ができず先に進められない
- 学習のサポートが欲しい

といった方向けにも、学習サポートを用意しています。

詳細は先ほど紹介したメールの中でも説明しています。
そちらで個別サポートの詳細をご確認いただけたらと思います。
（サポートのやりとりの連絡手段に、このメールを使う）

- [個別サポートの詳細を確認する](https://automation001.jp/p/r/TPNKhF0I) （解説ページのリンクと一緒に個別サポートの詳細を説明しています）
