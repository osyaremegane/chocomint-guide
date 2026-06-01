## Why

site-overview change で実装した `lib/microcms.ts` は仮のフィールド名（`mintLevel`、`chocolateness` など）を使っており、
実際に microCMS に登録するフィールド名（`mint_level`、`choco_level` など）と不一致のため、データが正しく取得できない。
今すぐ正式なデータモデルを定義し、TypeScript 型・SDK クライアント・microCMS スキーマを一致させる必要がある。

## What Changes

- microCMS の `products` API・`categories` API のフィールド仕様を正式定義する
- **BREAKING**: `lib/microcms.ts` の `Product` 型フィールド名を正式名称に変更する
  - 旧: `mintLevel`, `sweetness`, `aroma`, `chocolateness`, `coolness`, `rating`
  - 新: `mint_level`, `sweet_level`, `aroma_level`, `choco_level`, `cool_level`, `overall_rating`
- `Category` 型・`TasteProfile` 型・`TASTE_LABELS` 定数を追加する
- `category` フィールドをコンテンツ参照型（`categories` API）に変更する
- Phase 2 で追加予定の `reviews` API を概要レベルで文書化する

## Capabilities

### New Capabilities

- `data-model`: microCMS の products / categories API スキーマ定義・TypeScript 型定義・TASTE_LABELS 定数

### Modified Capabilities

- `site-overview`: `Product` 型フィールド名の変更により、`lib/microcms.ts`・`RadarChart`・`ProductCard` など参照箇所の更新が必要

## Impact

- `lib/microcms.ts` — `Product` 型の全フィールド名変更・`Category` 型追加・`getProducts` クエリ修正
- `app/components/RadarChart.tsx` — props 名変更（`mintLevel` → `mint_level` など）
- `app/components/ProductCard.tsx` — `product.rating` → `product.overall_rating` など
- `app/products/[id]/page.tsx` — `product.description` の HTML 文字列処理は変わらず
- microCMS ダッシュボードでフィールド名を正式名称に合わせる必要がある
