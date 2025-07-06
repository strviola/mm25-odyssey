# Music Odyssey

[マジカルミライ2025 プログラミングコンテスト](https://magicalmirai.com/2025/procon/) 応募作品

## 概要

このアプリは、楽曲の歌詞とリズムに合わせて宇宙空間に小惑星の軌道を描画する音楽可視化アプリケーションです。TextAlive APIを使用して楽曲データを取得し、SpaceKit.jsで3D宇宙空間をレンダリングします。

## 技術スタック

- **React** - UIフレームワーク
- **Vite** - ビルドツール
- **TextAlive API** - 楽曲データ取得・音楽同期
- **SpaceKit.js** - 3D宇宙空間可視化
- **Songle API** - 楽曲解析データ

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local` ファイルを作成し、TextAlive APIトークンを設定してください：

```
VITE_TEXTALIVE_API_TOKEN=your_api_token_here
```

### 3. ローカルサーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開くとアプリが起動します。

## 使用方法

1. アプリが起動すると、楽曲データの読み込みが始まります
2. 「Play」ボタンで楽曲を再生開始
3. 歌詞に合わせて小惑星が宇宙空間に生成されます
4. 各種コントロールボタンで再生操作が可能
5. マウスのドラッグ操作・ホイール操作で空間の移動操作が可能
