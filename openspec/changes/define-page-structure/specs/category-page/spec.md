## ADDED Requirements

### Requirement: カテゴリ別商品一覧を表示する
システムは `/categories/[slug]` で該当カテゴリの商品のみを商品グリッドで表示しなければならない (SHALL)。
レイアウト・ソート・ページネーションは `/products` と同一の仕様を使用する。

#### Scenario: ユーザーがカテゴリページを開く
- **WHEN** ユーザーが `/categories/ice` にアクセスする
- **THEN** システムはアイスカテゴリの商品のみをグリッドで表示する

#### Scenario: 該当カテゴリに商品が存在しない場合
- **WHEN** 商品が0件のカテゴリページにアクセスする
- **THEN** システムは「このカテゴリには商品が登録されていません」等の空状態メッセージを表示する

### Requirement: 存在しないカテゴリ slug は 404 を返す
システムは存在しないカテゴリ slug へのアクセスに対して 404 ページを返さなければならない (SHALL)。

#### Scenario: 無効な slug でアクセスする
- **WHEN** ユーザーが `/categories/invalid-slug` にアクセスする
- **THEN** システムは 404 ページを返す

### Requirement: カテゴリページのメタデータを設定する
システムはカテゴリページに対してカテゴリ名を含む `<title>` と `<meta description>` を出力しなければならない (SHALL)。

#### Scenario: アイスカテゴリページのメタデータ
- **WHEN** クローラーが `/categories/ice` にアクセスする
- **THEN** システムは「アイス | ChocoMint Sweets Guide」などカテゴリ名を含む `<title>` を返す
