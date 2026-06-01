## Context

site-overview change で実装した `lib/microcms.ts` は仮フィールド名を使っている。
microCMS ではスネークケース（`mint_level` など）がフィールド ID として使われる慣例であり、
TypeScript 側もそれに合わせる必要がある。
また、`category` は文字列セレクトではなくコンテンツ参照型に変更し、`categories` API と連携させる。

現状の仮型 (site-overview 実装時):
```
mintLevel, sweetness, aroma, chocolateness, coolness, rating
category: "ice" | "chocolate" | "drink" | "cake"
```

正式型 (this change):
```
mint_level, sweet_level, aroma_level, choco_level, cool_level, overall_rating
category: Category  // コンテンツ参照（Category オブジェクト）
```

## Goals / Non-Goals

**Goals:**
- `lib/microcms.ts` の `Product`・`Category` 型を正式フィールド名で定義する
- `TasteProfile` 型と `TASTE_LABELS` 定数を追加する
- `category` をコンテンツ参照型に更新し、`categories` API 取得関数を追加する
- `product` 型参照箇所（コンポーネント）を一括修正する
- Phase 2 の `reviews` API を概要ドキュメントとして記載する

**Non-Goals:**
- microCMS ダッシュボードの実際の操作（手動作業）
- `reviews` API の実装（Phase 2 別 change）
- 認証・ユーザー管理の実装

## Decisions

### フィールド名はスネークケース（microCMS の慣例に合わせる）
**Rationale**: microCMS のフィールド ID はスネークケースが標準的。SDK が返す JSON キーがそのままフィールド ID になるため、TypeScript 側もスネークケースに統一することでマッピング処理が不要になる。  
**Alternatives**: camelCase を TypeScript 側で使い、変換関数を挟む → 余分な変換レイヤーが生まれるため不採用。

### `category` はコンテンツ参照型（`Category` オブジェクト）にする
**Rationale**: カテゴリ名・アイコン・表示順などのメタデータを扱う際、文字列 ID だけでは不足。参照型にすることで1回の API コールでカテゴリ情報も取得できる。  
**Alternatives**: 文字列 ID のまま + 別途 `categories` API コール → N+1 リクエストの可能性。

### `TasteProfile` を独立した型として切り出す
**Rationale**: レーダーチャートの props 型と microCMS の Product 型で同じ5軸を参照するため、単一の型定義を再利用する。

### `TASTE_LABELS` を `lib/microcms.ts` 内に定数定義する
**Rationale**: 型定義と軸ラベルを同じファイルに置くことで、軸の追加・変更時の修正箇所が1ファイルに集中する。

## Risks / Trade-offs

- **BREAKING change**: `Product` 型フィールド名変更により `app/` 配下の複数コンポーネントで型エラーが発生する → migration plan の通り一括修正する
- **microCMS ダッシュボード側の作業が必要**: フィールド ID を正式名称で設定しないとデータが `undefined` になる → コードと同時進行でダッシュボードを設定する
- **`category` がオブジェクト参照になる**: `getProducts` のフィルタークエリは `category[equals]<categoryId>` ではなく `category[equals]<カテゴリのコンテンツID>` になる → `getCategories()` でカテゴリ一覧を先に取得し、slug から ID を逆引きする設計にする

## Migration Plan

1. `lib/microcms.ts` の型・関数を更新
2. `app/components/RadarChart.tsx` — props 名修正
3. `app/components/ProductCard.tsx` — `overall_rating` に修正
4. `app/products/[id]/page.tsx` — フィールド名全修正
5. `app/products/page.tsx` — category フィルターロジック修正
6. microCMS ダッシュボードでフィールド ID を正式名称に変更（手動）
7. `next build` で型エラーなしを確認

ロールバック: git revert で site-overview の実装状態に戻せる。
