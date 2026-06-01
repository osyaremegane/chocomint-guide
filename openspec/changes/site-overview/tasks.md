## 1. 環境・依存パッケージの準備

- [x] 1.1 `react-chartjs-2` と `chart.js` を `package.json` に追加してインストールする
- [x] 1.2 `microcms-js-sdk` を `package.json` に追加してインストールする
- [x] 1.3 `.env.local` に `MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY` を設定する
- [x] 1.4 microCMS に `products` コンテンツ型を作成し、設計通りのフィールドを定義する

## 2. microCMS クライアントの実装

- [x] 2.1 `lib/microcms.ts` を作成し microCMS SDK クライアントを初期化する
- [x] 2.2 `getProducts()`（一覧取得・カテゴリフィルター・ソート対応）を実装する
- [x] 2.3 `getProductById(id)`（詳細取得）を実装する

## 3. 基本レイアウト・共通コンポーネント

- [x] 3.1 `app/layout.tsx` にサイト名「ChocoMint Sweets Guide」とデフォルト OGP メタデータを設定する
- [x] 3.2 `app/components/Header.tsx` を作成し、ロゴとナビゲーションリンク（商品一覧）を実装する
- [x] 3.3 `app/components/Footer.tsx` を作成する
- [x] 3.4 `app/layout.tsx` にヘッダー・フッターを組み込む

## 4. トップページ

- [x] 4.1 `app/page.tsx` にヒーローセクション（サイト名・キャッチコピー・商品一覧への CTA）を実装する
- [x] 4.2 トップページの `<title>` と `<meta description>` を設定する

## 5. 商品一覧ページ

- [x] 5.1 `app/products/page.tsx` を作成し microCMS から商品一覧を取得して表示する
- [x] 5.2 `app/components/ProductCard.tsx` を作成し、商品画像・名前・カテゴリ・星評価を表示する
- [x] 5.3 カテゴリフィルター UI を実装し、URL クエリパラメータ (`?category=`) と連動させる
- [x] 5.4 ソートセレクター（おすすめ度順・新着順）を実装する
- [x] 5.5 商品 0 件時の空状態メッセージを実装する
- [x] 5.6 商品一覧ページの `<title>` と `<meta description>` を設定する

## 6. 商品詳細ページ

- [x] 6.1 `app/products/[id]/page.tsx` を作成し microCMS から商品詳細を取得して表示する
- [x] 6.2 `app/components/RadarChart.tsx` を作成し 5 軸（ミント感・甘さ・香り・チョコ感・清涼感）のレーダーチャートを実装する（`"use client"` コンポーネント）
- [x] 6.3 総合おすすめ度の星評価コンポーネント `app/components/StarRating.tsx` を実装する
- [x] 6.4 存在しない商品 ID の場合に `notFound()` を呼び出して 404 を返す
- [x] 6.5 商品詳細ページの `generateMetadata` で商品名・商品画像を含む OGP を設定する

## 7. レスポンシブ対応・品質確認

- [x] 7.1 スマートフォン（375px）・タブレット（768px）・デスクトップ（1024px）でレイアウトを確認する
- [x] 7.2 `next build` を実行してビルドエラーがないことを確認する
