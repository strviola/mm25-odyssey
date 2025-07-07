# Music Odyssey

[マジカルミライ2025 プログラミングコンテスト](https://magicalmirai.com/2025/procon/) 応募作品

## 概要

音楽に合わせて宇宙空間に言葉が飛びます。TextAlive APIを使用して楽曲データを取得し、SpaceKit.jsで3D宇宙空間をレンダリングしています。言葉の軌道は実在の小惑星群であるペルセウス座流星群を再現しています。

## 技術スタック

- [**TextAlive API**](https://developer.textalive.jp/) - 楽曲データ取得・音楽同期
- [**Songle API**](https://api.songle.jp/) - 楽曲解析データ
- [**SpaceKit.js**](https://typpo.github.io/spacekit/) - 3D宇宙空間レンダリング

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

### 3. アセットファイルのコピー

```
mkdir -p spacekit
cp -r ./node_modules/spacekit.js/src/data spacekit/
cp -r ./node_modules/spacekit.js/src/assets spacekit/
```

### 4. ローカルサーバーの起動

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

または、以下のURLから動作確認ができます。

https://imaginative-cheesecake-cfbb63.netlify.app/
