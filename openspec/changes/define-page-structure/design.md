## Context

site-overview・data-model change により、microCMS SDK・Product/Category 型・基本的なページ実装（`/products`・`/products/[id]`）が存在する。
しかしトップページ・カテゴリ別ページ・About ページが未実装であり、共通レイアウト（フッター・パンくずリスト・ハンバーガーメニュー）も未定義。
また `/products/[id]` は整数 ID ベースだが、SEO・可読性の観点から slug ベース（`/products/[slug]`）へ変更する。

## Goals / Non-Goals

**Goals:**
- Phase 1 の全ページ（`/`・`/products`・`/products/[slug]`・`/categories/[slug]`・`/about`）を実装するための設計を確定する
- 共通レイアウト（Header・Footer・Breadcrumb）の構造を決定する
- ブレークポイント（SP/タブレット/PC）を Tailwind クラスで統一する
- トップページの複数セクションに必要なデータ取得戦略を決定する

**Non-Goals:**
- Phase 2 機能（ユーザーレビュー・認証）
- 検索機能（全文検索）
- 無限スクロール（ページネーションで対応）

## Decisions

### URL: `/products/[slug]` に変更（BREAKING）
**Rationale**: microCMS コンテンツの `slug` フィールド（例: `mint-choco-ice`）を使うことで、URL が人間可読になり SEO も向上する。  
**Alternatives**: `[id]`（microCMS 自動生成 ID）のまま → URL が不透明で SEO 不利。

### トップページ: 複数クエリを `Promise.all` で並列取得
トップページは5セクション（新着6件・おすすめ3件・カテゴリ4件・期間限定）のデータが必要。  
**Rationale**: Server Component 内で `Promise.all([getNewArrivals(), getRecommended(), ...])` により並列取得し、ウォーターフォールを回避する。
**Alternatives**: 個別 `await` → リクエストが直列化して TTFB が増加。

### カテゴリ別ページ: `/products` のレイアウトを共通コンポーネント化して再利用
**Rationale**: `/products` と `/categories/[slug]` は同じ商品グリッド・ソート UI を持つ。`<ProductListView>` コンポーネントに `filterCategory?: string` を渡すだけで両ページに対応できる。  
**Alternatives**: ページ実装を重複させる → 仕様変更時に2か所修正が必要。

### ページネーション: Server Component でオフセット計算
`/products?page=2` のようにクエリパラメータでページを受け取り、Server Component で `offset = (page-1) * 12` を計算して microCMS API に `offset` パラメータを渡す。  
**Rationale**: Client-side ページネーションはデータ全件取得が前提となり不効率。SSR/ISR と相性が良いサーバーサイドオフセット方式を採用。

### ハンバーガーメニュー: Client Component（`useState` で開閉）
**Rationale**: メニューの開閉状態は UI 状態であり、Server Component では扱えない。最小限の `"use client"` コンポーネントに切り出すことで Server Component ツリーを汚染しない。

### パンくずリスト: 各ページの Server Component が生成して渡す
共通 `<Breadcrumb items={[{label, href}]} />` コンポーネントを作り、各ページが親子パスを props で渡す。  
**Rationale**: App Router の `usePathname` を使った自動生成は日本語ラベルの付与が困難。各ページが明示的にラベルを定義する方が管理しやすい。

### レスポンシブブレークポイント: Tailwind デフォルト `sm:` (640px) / `lg:` (1024px) を使用
仕様の SP（〜639px）・タブレット（640〜1023px）・PC（1024px〜）は Tailwind の `sm:` / `lg:` に対応する。カスタムブレークポイントは追加しない。

### 関連商品: microCMS の `filters` クエリで同カテゴリ3件取得、自身を除外
`getRelatedProducts(slug, categoryId)` → `filters=category[equals]{categoryId}[and]slug[not_equals]{slug}&limit=3`

## Risks / Trade-offs

- **`/products/[id]` → `[slug]` の BREAKING**: 既存の `generateStaticParams` と `getProductById` を `getProductBySlug` に変更が必要。microCMS の各コンテンツに `slug` フィールドを追加する手動作業も発生する。→ data-model change との作業順序に注意。
- **期間限定セクションはデータが0件になりうる**: `is_seasonal=true` の商品が存在しない場合はセクション自体を非表示にする（条件付きレンダリング）。
- **`Promise.all` での並列取得**: 1クエリがタイムアウトすると全セクションが失敗する → 各クエリに個別の `try/catch` を設け、失敗セクションのみ空配列でフォールバックする。

## Open Questions

- `about` ページのコンテンツは静的テキスト（JSX 直書き）か、microCMS で管理するか → Phase 1 では静的で実装し、Phase 2 で CMS 移行を検討。
- OGP 画像: トップページ・カテゴリページは静的 OGP 画像（`public/og-image.png`）、商品詳細は動的生成（`opengraph-image.tsx`）で対応する方針で進む。
