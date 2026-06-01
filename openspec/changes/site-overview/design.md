## Context

ChocoMint Sweets Guide は Next.js 16 (App Router) + Tailwind CSS 4 で構築する新規 Web サービス。
コンテンツ管理に microCMS、グラフ描画に react-chartjs-2 を採用し、Vercel にホスティングする。
現時点は create-next-app のデフォルト状態のみで、アプリ固有のコードは存在しない。

## Goals / Non-Goals

**Goals:**
- Phase 1 MVP（商品一覧・詳細・レーダーチャート・カテゴリフィルター・SEO/OGP）の実装基盤を確立する
- microCMS からデータを取得するアーキテクチャを決定する
- レーダーチャートの描画ライブラリと軸設計を決定する

**Non-Goals:**
- Phase 2 機能（ユーザー認証・レビュー投稿）— 別 change で対応
- 管理画面・コンテンツ入稿フロー — microCMS 側で管理
- パフォーマンス最適化の詳細チューニング

## Decisions

### データ取得: microCMS SDK + Server Components
**Rationale**: App Router の Server Components でビルド時・リクエスト時に microCMS API を呼び出すことで、クライアント JS を最小化しつつ SEO 対応できる。  
**Alternatives**: SWR/React Query でクライアントフェッチ → CSR になり初期 SEO が弱まる。

### グラフ: react-chartjs-2 (Chart.js)
**Rationale**: ユーザー仕様に指定済み。Radar chart を標準サポート。  
**Alternatives**: Recharts / Nivo — 仕様外なので不採用。

### microCMS コンテンツ型: `products`
フィールド設計（最低限）:
| フィールド | 型 | 説明 |
|---|---|---|
| name | テキスト | 商品名 |
| category | セレクト | アイス / チョコレート / ドリンク / ケーキ・焼き菓子 |
| mintLevel | 数値 (1–5) | ミント感 |
| sweetness | 数値 (1–5) | 甘さ |
| aroma | 数値 (1–5) | 香り |
| chocolateness | 数値 (1–5) | チョコ感 |
| coolness | 数値 (1–5) | 清涼感 |
| rating | 数値 (1–5) | 総合おすすめ度 |
| image | 画像 | 商品画像 |
| description | リッチエディタ | 商品説明 |

### ルーティング構造
```
/                    トップページ
/products            商品一覧
/products/[id]       商品詳細
```

### 環境変数
- `MICROCMS_SERVICE_DOMAIN` — microCMS サービスドメイン
- `MICROCMS_API_KEY` — microCMS API キー（読み取り専用キーを使用）

## Risks / Trade-offs

- **microCMS 無料プランの API 制限** → 開発初期は問題ないが、アクセス増加時に有料プランを検討
- **react-chartjs-2 は Client Component が必要** → `"use client"` を付けた専用ラッパーコンポーネントを作成し、Server Components との境界を明確にする
- **SSG vs ISR の選択** → 商品データは頻繁に更新されないため `revalidate` を設定した ISR を採用。動的フィルターは URL クエリパラメータで対応

## Open Questions

- microCMS の商品画像は CDN URL そのまま使うか、Next.js Image Optimization を通すか
- OGP 画像は静的画像か、商品ごとに動的生成するか（`opengraph-image.tsx` で対応可能）
