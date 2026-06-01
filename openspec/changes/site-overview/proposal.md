## Why

チョコミント好きが自分に合う商品を探すには、現状バラバラなレビューサイトや SNS を巡回するしかなく、味の特徴を体系的に比較する手段がない。
ChocoMint Sweets Guide は、市販品・カフェ商品を網羅したデータベースと味のレーダーチャートを提供し、「自分好みのチョコミント」を最短で見つけられるサイトを構築する。

## What Changes

- サイト全体の目的・ターゲットユーザー・コンテンツ方針を spec として文書化する
- 商品一覧・商品詳細ページの要件を定義する（Phase 1 MVP）
- 味評価体系（レーダーチャート 5 軸 + 総合おすすめ度）の仕様を定義する
- カテゴリフィルター・ソート・レスポンシブ・SEO/OGP の要件を定義する

## Capabilities

### New Capabilities

- `site-overview`: サイト全体の目的・ターゲット・コンテンツ方針・技術構成・フェーズ計画
- `product-list`: 商品一覧ページ（カテゴリフィルター・ソート機能を含む）
- `product-detail`: 商品詳細ページ（味のレーダーチャート・総合おすすめ度表示を含む）

### Modified Capabilities

<!-- 初回策定のため既存 spec への変更なし -->

## Impact

- `app/` 配下に新規ページ・コンポーネントを追加する
- 外部依存を追加: `react-chartjs-2` / `chart.js`（グラフ）、`microcms-js-sdk`（CMS クライアント）
- 環境変数: `MICROCMS_SERVICE_DOMAIN`、`MICROCMS_API_KEY` が必要
- Vercel へのデプロイ前提（Phase 2 で Vercel 認証機能を利用）
