## ADDED Requirements

### Requirement: サイトのコンセプトを説明する
システムは `/about` でサイトの目的・コンセプト・ターゲットユーザーを説明するコンテンツを表示しなければならない (SHALL)。

#### Scenario: ユーザーが About ページを開く
- **WHEN** ユーザーが `/about` にアクセスする
- **THEN** システムはサイトのコンセプト説明とターゲットユーザーの説明を表示する

### Requirement: 評価基準を説明する
システムは `/about` でレーダーチャート5軸（ミント感・甘さ・香り・チョコ感・清涼感）と総合おすすめ度の評価基準を説明しなければならない (SHALL)。

#### Scenario: ユーザーが評価基準を確認する
- **WHEN** ユーザーが `/about` を開く
- **THEN** システムは各評価軸の定義と1〜5スケールの意味を説明するセクションを表示する

### Requirement: About ページのメタデータを設定する
システムは `/about` に適切な `<title>` と `<meta description>` を出力しなければならない (SHALL)。

#### Scenario: About ページのメタデータ
- **WHEN** クローラーが `/about` にアクセスする
- **THEN** システムは「このサイトについて | ChocoMint Sweets Guide」等のタイトルを返す
