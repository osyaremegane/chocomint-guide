## Why

site-overview change で定義したサイト概要・商品一覧・商品詳細の要件は MVP 最小限にとどまっており、
実際に Phase 1 として構築すべきページ一覧・ルーティング・共通レイアウト・レスポンシブ仕様が未定義のため、
今すぐ全ページ構成を仕様化し、実装の根拠を固める必要がある。

## What Changes

- トップページ（`/`）のセクション構成（ヒーロー・新着・カテゴリ・おすすめ・期間限定）を定義する
- 商品一覧ページ（`/products`）のソート拡張（ミント感順・価格順追加）とページネーション（12件/ページ）を追加する
- **BREAKING**: 商品詳細ページの URL を `/products/[id]` から `/products/[slug]` へ変更する
- カテゴリ別一覧ページ（`/categories/[slug]`）を新規追加する
- サイト紹介ページ（`/about`）を新規追加する
- 共通レイアウト（ヘッダー・フッター・パンくずリスト）の詳細要件を定義する
- レスポンシブブレークポイントを SP（〜639px）・タブレット（640〜1023px）・PC（1024px〜）として正式定義する

## Capabilities

### New Capabilities

- `top-page`: トップページ（`/`）のセクション構成・データ取得要件・CTA の仕様
- `category-page`: カテゴリ別一覧ページ（`/categories/[slug]`）の要件
- `about-page`: サイト紹介ページ（`/about`）のコンテンツ要件
- `common-layout`: 共通ヘッダー・フッター・パンくずリストの詳細要件

### Modified Capabilities

- `product-list`: ソート選択肢の追加（ミント感順・価格順）とページネーション要件（12件/ページ）
- `product-detail`: URL を slug ベースへ変更・購入リンク・関連商品（同カテゴリ3件）の要件追加
- `site-overview`: ハンバーガーメニュー・フッター・パンくずリストを含む共通レイアウト要件の更新

## Impact

- `app/page.tsx` — トップページ実装（新規セクション追加）
- `app/products/[id]/` → `app/products/[slug]/` ディレクトリ名変更（BREAKING）
- `app/categories/[slug]/` — 新規ページ追加
- `app/about/` — 新規ページ追加
- `app/components/` — Header・Footer・Breadcrumb・HeroSection・ProductGrid コンポーネント追加
- `lib/microcms.ts` — `getProductBySlug`・`getRelatedProducts`・`getTopPageData` などクエリ関数追加
- Tailwind CSS のブレークポイント設定（`sm: 640px`・`lg: 1024px`）を活用
