# 画面づくりの下調べ（写真ZINE海外販売サイト）

作成日: 2026-09-26。white-ui 手順1に基づく。方向の了承をもらってから制作に入る。

## 競合サイト（3つ）
実サイトの取得はこの作業環境のネットワーク制限で弾かれたため、検索結果の情報と商品ページの断片から読んだ。

| サイト | 構成・導線 | 売りにしている点 | 借りる点 |
|---|---|---|---|
| shashasha（東京、写真集・ZINEの海外向け通販） | 地域（Japan & Asia）→ 種別（Photobook / Zine / Signed / Second-hand）→ Best Sellers。出版社ページあり。卸は「書店向けアカウント」を個別審査、送料は重量ベースで小売店負担 | 日本の写真集への窓口という立ち位置。Signed / Limited を前面に出す | 商品仕様を「サイズ mm × ページ数 × 綴じ × Edition of N」で必ず並べる。卸は決済ではなく申請フォーム |
| Dashwood Books（NY、写真集専門店） | Emerging Artist Zines / OOP Zines などのカテゴリ。商品名に SIGNED / First Edition / PRE-ORDER を直接含める | 若手写真家のZINEを店として選んで出す。署名入りの価値を強調 | 「Signed」「Edition of」をカードの見える位置に置く。作家名を主役にする |
| Dale Zine Shop（マイアミ、ZINE専門） | Zines / Books のシンプルな一覧。商品ページはページ数・年・判型が並ぶ。世界発送を明記 | 少量・作家性の強いZINEの品揃え。発送の明快さ | トップは説明を短く、作品を先に見せる。発送先・送料の案内を1行で置く |

## Mobbin 画面（10）と借りる点
| # | 画面 | 借りる点 |
|---|---|---|
| 1 | [Literal 書籍詳細](https://mobbin.com/screens/e3239812-4da8-44a2-b61c-f2f1285ed3c7) | 左に表紙、右に説明→仕様表（ラベルと値の2列）→ボタン、の縦順 |
| 2 | [Uvodo 商品詳細](https://mobbin.com/screens/c5fe9345-8f8a-45e3-b9cb-c239cb738576) | 白背景に写真1枚、価格を大きく、要素を減らす |
| 3 | [Apple 商品詳細](https://mobbin.com/screens/1ef39a52-ca4d-4dbb-aa3a-bbed7532c7d6) | 写真の周りの余白の広さ。価格の下に補足（税・送料）を小さく |
| 4 | [Cosmos 作家ページ](https://mobbin.com/screens/00f241f1-bd9a-4796-bf55-ba6e835249fc) | 上に小さな顔写真と1行の自己紹介、下に作品グリッド |
| 5 | [Savee 作家ページ](https://mobbin.com/screens/087ce5cf-e2cd-4fa8-84be-c9ecc57e2073) | 中央寄せの名前と肩書、リンクは文字だけ。装飾なし |
| 6 | [Julienne 本の一覧](https://mobbin.com/screens/c5c37f34-b6fc-47dd-82ea-e58223bcd341) | カードは表紙・タイトル・作者・価格の4点だけ |
| 7 | [Literal 本棚](https://mobbin.com/screens/edf7565b-d355-425b-acd9-abd0337c7135) | 表紙を実寸比で並べる。枠線なし |
| 8 | [Savee 検索結果グリッド](https://mobbin.com/screens/0794f5f1-6475-423e-85e1-eb030fdcc4cb) | 縦横比の違う表紙をそのまま並べる（正方形に切らない） |
| 9 | [Faire カート](https://mobbin.com/screens/2529218c-8dc2-4225-aa9b-32ba6b5e5060) | 卸向けカートの「最低数量」バーの見せ方。数量は選択式 |
| 10 | [Selfridges カート](https://mobbin.com/screens/446e5a11-4693-40f2-913b-949a0da916d8) | 国／通貨の切り替えを右上に。関税・送料の注意を注文サマリー内に |
| 11 | [Faire 卸申請フォーム](https://mobbin.com/screens/f0d0b3e2-1a33-4881-b919-af4b9b66cf23) | 「転売目的であること」を宣誓させる1行。項目を絞る |

## 合格ライン（white-ui 手順2）
- 白黒だけで成り立つ。色は「Sold out」「Signed」の印など最小限。
- 書体はゴシック系。文字サイズは4段階まで。
- トップは説明文を2行以内、作品グリッドを先に。
- 商品ページは「表紙 → 作家名 → タイトル → 価格（円＋ドル参考）→ 仕様表 → ボタン」。
- 現在の配色（stone／amber、明朝）は捨てる。アンティーク向けの雰囲気なので。
