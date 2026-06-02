# 計画：pâtisserie OKAMO デモサイト制作

## 背景と目的

金沢市北安江にある「pâtisserie OKAMO（オーナー：岡本康幸氏）」はすでに営業中だがホームページがない。
デモサイトを先に制作し、それをオーナーに見せて制作受注につなげる提案営業を行う。

---

## 収集済み店舗情報

| 項目 | 内容 |
|------|------|
| 店名 | pâtisserie OKAMO（パティスリー オカモ） |
| 所在地 | 〒920-0022 石川県金沢市北安江4丁目10-22 |
| 電話 | 076-254-1299 |
| 営業時間 | 11:00〜18:00 |
| 定休日 | 不明（要確認） |
| オーナー | 岡本康幸 |
| オープン | 2025年7月 |
| 商品 | ショートケーキ・ひな祭り/母の日デコレーション・ムースケーキ・焼き菓子（ラングドシャ・ディアマン・サブレ）・クッキー缶・贈答用ギフト |
| 外装カラー | ダークモスグリーン外壁 + チャコールグレー看板 + ホワイト文字 |
| Instagram | @patisserie_okamo |
| Facebook | ID: 61578312539653 |

---

## 成果物

**静的ウェブサイト（HTML/CSS/JS）**を作成し、GitHub Pages で公開。

### ファイル構成

```
patisserie-okamo-demo/
├── index.html      # メインHTML（1ページ完結のスクロールサイト）
├── css/
│   └── style.css   # デザイン全般
├── js/
│   └── main.js     # スムーズスクロール・モバイルメニュー・フォーム
└── images/         # (Unsplash経由の画像URLを直接参照するため不要)
```

---

## ページ構成（1ページスクロール型）

| セクション | 内容 |
|------------|------|
| Navigation | ロゴ + メニューリンク（スマホはハンバーガー） |
| Hero | 全画面ビジュアル + キャッチコピー + CTA（予約ボタン） |
| About | お店のコンセプト・オーナー紹介 |
| Products | ケーキ/焼き菓子/ギフトの3カテゴリ（Unsplash画像） |
| Instagram | @patisserie_okamo フィード風グリッド + フォローボタン |
| Reservation | 予約リクエストフォーム（実装はmailto形式） |
| News | お知らせサンプル3件 |
| Access | Google Maps埋め込み + 営業時間・定休日・TEL |
| Footer | ロゴ・SNSリンク・コピーライト |

---

## デザインシステム

外装写真（Facebookカバー写真）から抽出した実際の店舗カラーを使用する。

| 要素 | 内容 |
|------|------|
| プライマリ（外壁グリーン） | `#2D5A3D`（ダークモスグリーン） |
| セカンダリ（看板背景） | `#2C3040`（チャコールグレー） |
| 背景ライト | `#F7F9F6`（グリーン寄りのオフホワイト） |
| アクセント | `#8FBF9A`（ライトグリーン・ホバーやボーダー用） |
| テキスト | `#1A1A1A`（ほぼブラック） |
| テキスト白 | `#FFFFFF` |
| 見出しフォント | Cormorant Garamond（Google Fonts・セリフ） |
| 本文フォント | Noto Serif JP（Google Fonts） |
| レイアウト | モバイルファースト、max-width: 1200px |
| 雰囲気 | 店舗の深緑×グレーのクールでモダンなパティスリー感 |

---

## 技術スタック

- HTML5 / CSS3（CSS variables・Flexbox・Grid）
- Vanilla JavaScript（依存ゼロ）
- Google Fonts（Cormorant Garamond・Noto Serif JP）
- Unsplash Source API（ケーキ・焼き菓子の高品質フリー画像をURL直参照）
- Google Maps Embed API（無料・APIキー不要の埋め込み形式）
- GitHub Pages（静的ホスティング）

---

## GitHub Pages 公開手順（実装後）

1. `git init && git add . && git commit -m "Initial commit"` でローカルリポジトリ作成
2. GitHub に `patisserie-okamo-demo` リポジトリを新規作成（publicで）
3. `git remote add origin` してプッシュ
4. Settings → Pages → Source: Deploy from branch `main` `/root` で有効化
5. `https://<username>.github.io/patisserie-okamo-demo/` でアクセス確認

---

## 実装ステップ

1. `index.html` を作成（セマンティックHTML、全セクション含む）
2. `css/style.css` を作成（CSS変数→リセット→コンポーネント順）
3. `js/main.js` を作成（メニュー開閉・スムーズスクロール・フォームバリデーション）
4. Unsplash の cake/pastry 画像URL を埋め込み（ライセンス: Unsplash License、商用可）
5. Google Maps の embed URL を生成して埋め込み
6. GitHub リポジトリ作成・プッシュ・Pages 有効化

---

## 注意点

- Instagramの公式埋め込みはログイン状態に依存するため、デモではInstagramフィード風のグリッドをCSS+Unsplash画像で再現し、実際のアカウントへのリンクを明示する
- フォームはデモなので `mailto:` リンクまたは Formspree（無料プラン）を使用
- 営業時間は11:00〜18:00と確認済み。定休日は不明のため「TBD」プレースホルダーを入れる
