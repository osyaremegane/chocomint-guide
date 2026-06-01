## ADDED Requirements

### Requirement: products API スキーマを正式定義する
システムは microCMS の `products` API を以下のフィールドで構成しなければならない (SHALL)。
フィールド ID はスネークケースを使用する。

| フィールド ID | 型 | 必須 | 説明 |
|---|---|---|---|
| title | テキスト | ✓ | 商品名 |
| slug | テキスト | ✓ | URL パス用識別子（英数字・ハイフン） |
| description | リッチエディタ | ✓ | 商品説明（HTML） |
| image | 画像 | ✓ | メイン写真 |
| category | コンテンツ参照（categories） | ✓ | カテゴリ参照 |
| brand | テキスト | ✓ | ブランド名 |
| price | 数値 | - | 税込価格（円） |
| mint_level | 数値 1–5 | ✓ | ミント感 |
| sweet_level | 数値 1–5 | ✓ | 甘さ |
| aroma_level | 数値 1–5 | ✓ | 香り |
| choco_level | 数値 1–5 | ✓ | チョコ感 |
| cool_level | 数値 1–5 | ✓ | 清涼感 |
| overall_rating | 数値 1–5 | ✓ | 総合おすすめ度 |
| is_seasonal | 真偽値 | ✓ | 期間限定フラグ |
| seasonal_note | テキスト | - | 販売期間メモ |
| purchase_url | テキスト | - | 購入リンク URL |

#### Scenario: 商品データを API で取得する
- **WHEN** `getProductById(id)` を呼び出す
- **THEN** 上記フィールドを持つ `Product` オブジェクトが返る

#### Scenario: 必須フィールドが欠けた商品データを登録しようとする
- **WHEN** microCMS ダッシュボードで `title` を空のまま保存する
- **THEN** microCMS がバリデーションエラーを返し、保存できない

### Requirement: categories API スキーマを定義する
システムは microCMS の `categories` API を以下のフィールドで構成しなければならない (SHALL)。

| フィールド ID | 型 | 必須 | 説明 |
|---|---|---|---|
| name | テキスト | ✓ | カテゴリ名（日本語） |
| slug | テキスト | ✓ | URL パス用識別子 |
| icon | 画像 | - | カテゴリアイコン |
| description | テキスト | - | カテゴリ説明 |
| sort_order | 数値 | ✓ | 表示順（小さいほど先頭） |

初期カテゴリは以下の 4 件とする:
| name | slug | sort_order |
|---|---|---|
| アイス | ice | 1 |
| チョコレート | chocolate | 2 |
| ドリンク | drink | 3 |
| ケーキ・焼き菓子 | cake | 4 |

#### Scenario: カテゴリ一覧を取得する
- **WHEN** `getCategories()` を呼び出す
- **THEN** `sort_order` 昇順で全カテゴリが返る

#### Scenario: 商品詳細でカテゴリが解決される
- **WHEN** `getProductById(id)` を呼び出す
- **THEN** `product.category` は文字列 ID ではなく `Category` オブジェクトとして返る

### Requirement: TypeScript 型定義を提供する
`lib/microcms.ts` は以下の型・定数をエクスポートしなければならない (SHALL)。

```typescript
// 味の5軸
type TasteProfile = {
  mint_level: number;
  sweet_level: number;
  aroma_level: number;
  choco_level: number;
  cool_level: number;
};

type Category = MicroCMSListContent & {
  name: string;
  slug: string;
  icon?: MicroCMSImage;
  description?: string;
  sort_order: number;
};

type Product = MicroCMSListContent & TasteProfile & {
  title: string;
  slug: string;
  description: string;
  image: MicroCMSImage;
  category: Category;
  brand: string;
  price?: number;
  overall_rating: number;
  is_seasonal: boolean;
  seasonal_note?: string;
  purchase_url?: string;
};

const TASTE_LABELS: Record<keyof TasteProfile, string>;
```

#### Scenario: TypeScript でフィールドにアクセスする
- **WHEN** `product.mint_level` を TypeScript コードで参照する
- **THEN** 型エラーが発生せず、`number` 型として推論される

#### Scenario: TASTE_LABELS で軸名を取得する
- **WHEN** `TASTE_LABELS.mint_level` を参照する
- **THEN** `"ミント感"` が返る

### Requirement: reviews API を Phase 2 用に概要定義する
`reviews` API は Phase 2 で実装予定のため、現時点では設計概要のみ定義する (SHALL)。
実装は別 change で行う。

概要:
- ログインユーザーが商品に対してレビュー（評価・コメント）を投稿できる
- 商品詳細ページでその商品に紐付いたレビュー一覧を表示できる
- 認証は Vercel 認証機能（Phase 2）を前提とする

#### Scenario: Phase 2 でレビュー機能を追加する
- **WHEN** Phase 2 の change が開始される
- **THEN** この spec の概要定義を基に reviews API の詳細 spec が作成される
