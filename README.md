# 「Nest.js × Puppeteer × Supabase」で、YouTube 広告動画と LP を自動収集&保存するプログラム開発講座


この講座の学習に行き詰まった方向けの「個別学習サポート」を用意しています。

学習サポートが必要になった方は、そちらもご利用いただけたらと思います。

「個別の学習サポート」について、この説明の最後の方にも書いているので、そちらもご確認ください。



## このレポジトリの概要

このレポジトリは、僕が運営しているしている「プログラミング学習系のコミュニティ・メルマガ・LINE」などに案内を出した際に、複数の方から「興味あり」と反応をいただいたことがきっかけで生まれたプログラミング講座になります。（バックエンド開発）

ちなみに、運営しているプログラミング学習系コミュニティ・メルマガ・LINEには、以下のようなものがあります。

- メルマガ
  - [Web白熱教室](https://tsuyopon.xyz/lp/mail-magazine-training-course-for-beginner/)
- LINE公式アカウント
  - [Web白熱教室](https://tsuyopon.xyz/lp/mail-magazine/)
  - [JavaScript関数ドリル](https://js-drills.com/) 
  - [HTML&CSS速習教室](https://html-css-guide-five.vercel.app/)
  - [Webスキルスクール](https://web-skills-school.com/line-official-account/)
- [Front Hacks](https://tsuyopon.xyz/2021/02/20/fronthacks/)


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


## サンプルコード

先ほど紹介した各技術ごとにサンプルコードを以下のディレクトリごとに分けて用意しています。
必要に応じて学習の参考としてお使いください。

- [nestjs-part](https://github.com/tsuyopon-xyz/yt-ads-scraping-online-seminar/tree/main/nestjs-part) : 「NestJS」の解説で利用するサンプルコード
- [puppeteer-part](https://github.com/tsuyopon-xyz/yt-ads-scraping-online-seminar/tree/main/puppeteer-part) : 「Puppeteer」の解説で利用するサンプルコード
- [docker-part](https://github.com/tsuyopon-xyz/yt-ads-scraping-online-seminar/tree/main/docker-part) : 「Docker, Docker Compose, DBeaver」の解説で利用するサンプルコード
- [prisma-part](https://github.com/tsuyopon-xyz/yt-ads-scraping-online-seminar/tree/main/prisma-part) : 「Prisma」「Supabase」の解説で利用するサンプルコード
- [youtube-data-api-part](https://github.com/tsuyopon-xyz/yt-ads-scraping-online-seminar/tree/main/youtube-data-api-part) : 「YouTube Data API」の解説で利用するサンプルコード
- [exercise-part](https://github.com/tsuyopon-xyz/yt-ads-scraping-online-seminar/tree/main/exercise-part) : 「演習課題」の解説で利用するサンプルコード


## 解説動画

この開発講座の解説動画は、それぞれ以下のリンクから確認することができます。


（**TODO** : 動画撮影&アップが完了したらリンクを貼る）


## 解説動画内で使っている解説ページを見たい場合

以下の「開発講座フォローアップメルマガ」の中で、解説動画で使っている解説ページのリンクを共有します。
（1日に1つずつ共有していきます。）

（**TODO** : 「開発講座フォローアップメルマガ」を作ったらリンクを貼る）


## 個別サポートを受けたい方向け

- 学習に行き詰まった
- エラー対応ができず先に進められない
- 学習のサポートが欲しい

といった方向けにも、学習サポートを用意しています。

詳細は「開発講座フォローアップメルマガ」の中で説明しています。

個別サポートに興味のある方は、一度「開発講座フォローアップメルマガ」に登録していただき、そちらで個別サポートの詳細をご確認いただけたらと思います。
（サポートのやりとりの連絡手段に「開発講座フォローアップメルマガ」のメールを使う想定。）

もし「Slack」や「Discord」でのやりとりを希望される場合は、その旨をメールで教えていただけたらと思います。
（「Slack」または「Discord」の環境を、僕が用意するか、あなたが用意するか、メールの中で決められたらと思います。）
