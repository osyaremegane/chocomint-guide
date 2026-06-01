## 1. lib/microcms.ts クエリ関数の追加

- [ ] 1.1 `getProductBySlug(slug)` を追加し、`slug` フィールドでコンテンツを1件取得する（`getProductById` の置き換え）
- [ ] 1.2 `getRelatedProducts(slug, categoryId)` を追加し、同カテゴリかつ自身を除く商品を最大3件取得する
- [ ] 1.3 `getNewArrivals(limit)` を追加し、`publishedAt` 降順で指定件数の商品を取得する
- [ ] 1.4 `getRecommended(limit)` を追加し、`overall_rating` 降順で指定件数の商品を取得する
- [ ] 1.5 `getSeasonalProducts()` を追加し、`is_seasonal=true` の商品を取得する
- [ ] 1.6 `getProducts()` に `offset` パラメータを追加し、ページネーション用のオフセット取得に対応する
- [ ] 1.7 `getProducts()` のソートオプションに `mint_level` 降順・`price` 昇順を追加する

## 2. 共通レイアウトの拡張

- [ ] 2.1 `app/components/Header.tsx` のナビゲーションに「カテゴリ」（`/categories`）と「このサイトについて」（`/about`）リンクを追加する
- [ ] 2.2 `app/components/Header.tsx` に SP 用ハンバーガーメニューを実装する（`"use client"` コンポーネント）
- [ ] 2.3 `app/components/Breadcrumb.tsx` を作成し、`{ label, href }[]` を受け取るパンくずリストコンポーネントを実装する

## 3. トップページ（/）のリッチ化

- [ ] 3.1 `app/page.tsx` でトップページに必要な4クエリ（新着・おすすめ・カテゴリ・期間限定）を `Promise.all` で並列取得する
- [ ] 3.2 ヒーローセクションをチョコミントグラデーション背景・キャッチコピー・CTA ボタンでリッチ化する
- [ ] 3.3 新着商品セクションを実装し、`publishedAt` 降順の最新6件を商品カードグリッドで表示する
- [ ] 3.4 カテゴリ一覧セクションを実装し、4カテゴリのリンクカードを表示する
- [ ] 3.5 おすすめ商品セクションを実装し、`overall_rating` 降順の上位3件を表示する
- [ ] 3.6 期間限定商品セクションを実装し、`is_seasonal=true` の商品を表示する（0件の場合は非表示）

## 4. 商品一覧ページの拡張（/products）

- [ ] 4.1 ソートセレクターに「ミント感順」（`mint_level` 降順）と「価格順」（`price` 昇順）を追加する
- [ ] 4.2 ページネーションコンポーネントを実装し、1ページ12件・`?page=N` クエリパラメータと連動させる
- [ ] 4.3 Server Component で `page` クエリパラメータから `offset = (page-1) * 12` を計算して `getProducts` に渡す
- [ ] 4.4 商品グリッドを PC 3列・タブレット 2列・SP 1列のレスポンシブグリッドに修正する

## 5. 商品詳細ページの slug 化・拡張（/products/[slug]）

- [ ] 5.1 `app/products/[id]/` ディレクトリを `app/products/[slug]/` に改名し、`getProductById` を `getProductBySlug` に変更する
- [ ] 5.2 `generateStaticParams` を `getProducts()` の slug 一覧を返すよう更新する
- [ ] 5.3 商品基本情報にブランド・価格・期間限定バッジを追加する
- [ ] 5.4 `purchase_url` がある商品に「購入する」外部リンクボタンを追加する（新規タブで開く）
- [ ] 5.5 関連商品セクションを実装し、`getRelatedProducts` で同カテゴリ最大3件を表示する（0件は非表示）
- [ ] 5.6 パンくずリスト「ホーム > 商品一覧 > 商品名」を追加する

## 6. カテゴリ別一覧ページ（/categories/[slug]）

- [ ] 6.1 `app/categories/[slug]/page.tsx` を作成し、`getCategories()` で slug からカテゴリ ID を解決する
- [ ] 6.2 `<ProductListView filterCategory={categoryId}>` の共通コンポーネント（または再利用ロジック）を使ってカテゴリ絞り込み済みの商品グリッドを表示する
- [ ] 6.3 存在しないカテゴリ slug の場合に `notFound()` を呼び出す
- [ ] 6.4 `generateStaticParams` を `getCategories()` の slug 一覧を返すよう実装する
- [ ] 6.5 ページのメタデータにカテゴリ名を含む `<title>` を設定する
- [ ] 6.6 パンくずリスト「ホーム > カテゴリ名」を追加する

## 7. サイト紹介ページ（/about）

- [ ] 7.1 `app/about/page.tsx` を作成し、サイトコンセプト・ターゲットユーザーの説明を静的コンテンツで実装する
- [ ] 7.2 レーダーチャート5軸の評価基準説明セクションを実装する
- [ ] 7.3 ページの `<title>` と `<meta description>` を設定する
- [ ] 7.4 パンくずリスト「ホーム > このサイトについて」を追加する

## 8. 品質確認

- [ ] 8.1 `next build` を実行して TypeScript エラーがないことを確認する
- [ ] 8.2 SP（375px）・タブレット（768px）・PC（1280px）でレイアウトと全ページを目視確認する
- [ ] 8.3 `/products/[id]/` → `/products/[slug]/` のルーティング変更を確認し、旧 URL にアクセスした場合の挙動を確認する
