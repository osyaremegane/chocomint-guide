## 1. lib/microcms.ts の型・関数更新

- [x] 1.1 `TasteProfile` 型を定義し、5 軸フィールド（`mint_level`・`sweet_level`・`aroma_level`・`choco_level`・`cool_level`）をスネークケースで宣言する
- [x] 1.2 `Category` 型を `MicroCMSListContent` ベースで定義する（`name`・`slug`・`icon?`・`description?`・`sort_order`）
- [x] 1.3 `Product` 型を正式フィールド名に更新する（`TasteProfile` を intersection で組み込み、`overall_rating`・`category: Category`・`brand`・`price?`・`is_seasonal`・`seasonal_note?`・`purchase_url?` を追加）
- [x] 1.4 `TASTE_LABELS` 定数（`Record<keyof TasteProfile, string>`）を定義し、各軸の日本語ラベルを設定する
- [x] 1.5 `getCategories()` 関数を追加し、`sort_order` 昇順で全カテゴリを返すよう実装する
- [x] 1.6 `getProducts()` の `category` フィルターを `category[equals]<categoryId>` 形式に変更し、slug からカテゴリ ID を解決するロジックを追加する

## 2. コンポーネントのフィールド名修正

- [x] 2.1 `app/components/RadarChart.tsx` の props 型を `TasteProfile` に変更し、`mintLevel` → `mint_level`・`chocolateness` → `choco_level` などすべての props 名を修正する
- [x] 2.2 `app/components/ProductCard.tsx` の `product.rating` を `product.overall_rating` に修正する
- [x] 2.3 `app/components/ProductCard.tsx` の `product.name` を `product.title` に修正する

## 3. ページのフィールド名修正

- [x] 3.1 `app/products/[id]/page.tsx` の `product.name` を `product.title` に修正する
- [x] 3.2 `app/products/[id]/page.tsx` の RadarChart への props 渡し（`mint_level`・`sweet_level` など）を修正する
- [x] 3.3 `app/products/[id]/page.tsx` の `product.rating` を `product.overall_rating` に修正する
- [x] 3.4 `app/products/[id]/page.tsx` の `product.category` をオブジェクト参照として扱い、`product.category.name` でカテゴリ名を表示するよう修正する
- [x] 3.5 `app/products/page.tsx` のカテゴリフィルターロジックを `categories` API 経由（slug → ID 解決）に更新する
- [x] 3.6 `app/components/ProductFilters.tsx` のカテゴリリストを静的定数から `getCategories()` の返り値に変更する

## 4. microCMS ダッシュボード設定（手動）

- [x] 4.1 microCMS に `categories` API（リスト形式）を作成し、設計通りのフィールドを定義する
- [x] 4.2 microCMS の `categories` API に初期データ 4 件（アイス・チョコレート・ドリンク・ケーキ・焼き菓子）を登録する
- [x] 4.3 microCMS の `products` API のフィールド ID を正式名称（スネークケース）に更新し、`category` フィールドをコンテンツ参照型（categories）に変更する

## 5. 品質確認

- [x] 5.1 `next build` を実行して TypeScript エラーがないことを確認する
