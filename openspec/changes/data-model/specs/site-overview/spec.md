## MODIFIED Requirements

### Requirement: 味のレーダーチャートを表示する
システムは商品詳細ページで 5 軸（ミント感・甘さ・香り・チョコ感・清涼感）のレーダーチャートを表示しなければならない (SHALL)。
各軸の値は 1〜5 のスケールで、microCMS のフィールド値（`mint_level`・`sweet_level`・`aroma_level`・`choco_level`・`cool_level`）を使用する。
`RadarChart` コンポーネントの props は `TasteProfile` 型に準拠する。

#### Scenario: ユーザーがレーダーチャートを確認する
- **WHEN** 商品詳細ページが表示される
- **THEN** システムはミント感・甘さ・香り・チョコ感・清涼感の 5 軸レーダーチャートを描画する

#### Scenario: すべての軸が最大値の商品
- **WHEN** 5 軸すべてが 5 の商品の詳細ページを開く
- **THEN** システムは正五角形に近い形のレーダーチャートを表示する

### Requirement: 総合おすすめ度を星で表示する
システムはレーダーチャートとは別に、総合おすすめ度（`overall_rating`、1〜5）を星アイコンで表示しなければならない (SHALL)。
フィールド名は `overall_rating` を使用する（旧: `rating`）。

#### Scenario: おすすめ度 4 の商品を表示する
- **WHEN** `overall_rating` が 4 の商品詳細ページを開く
- **THEN** システムは星 4 つ（塗りつぶし）と星 1 つ（空）を表示する

### Requirement: カテゴリでフィルターできる
システムはカテゴリ（アイス / チョコレート / ドリンク / ケーキ・焼き菓子）で商品を絞り込めなければならない (SHALL)。
フィルター値は `categories` API の `slug` を使用する。
`product.category` はコンテンツ参照型 `Category` オブジェクトであるため、フィルター UI では `category.slug` を用いる。
フィルター状態は URL クエリパラメータ (`?category=ice` など) に反映する。

#### Scenario: カテゴリを選択してフィルターする
- **WHEN** ユーザーが「アイス」フィルターを選択する
- **THEN** システムはカテゴリ slug が `ice` の商品のみ表示し、URL を `?category=ice` に更新する

#### Scenario: フィルターを解除する
- **WHEN** ユーザーが「すべて」フィルターを選択する
- **THEN** システムはすべての商品を表示する
