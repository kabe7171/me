# 開発スキル・ナレッジ集

## Next.js App Router パターン

### Server Component と Client Component の分離
- ページ本体は Server Component のまま維持
- インタラクティブな部分だけを別ファイルの Client Component に切り出す
- 例: `products/[id]/page.tsx` (Server) + `AddToCartButton.tsx` (Client)

### Dynamic Routes の params
- Next.js 16 では `params` が `Promise` になった
- `async function Page({ params }: { params: Promise<{ id: string }> })` のように定義
- `const { id } = await params;` で取得

### generateStaticParams
- 静的に生成するパスを返す関数
- 商品IDの一覧から自動生成: `products.map(p => ({ id: p.id }))`

## Tailwind CSS テクニック

### line-clamp でテキスト省略
- `line-clamp-2` で2行に制限（Tailwind v3.3+）

### レスポンシブグリッド
```
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6
```

## React Context パターン

### カート実装
- `CartProvider` で状態管理
- `useCart()` フックで消費
- layout.tsx の `<CartProvider>` でアプリ全体をラップ

## トラブルシューティング

### Google Fonts 403 エラー
- 制限環境では Google Fonts API が使えない場合がある
- **対処**: システムフォントにフォールバック、`font-serif` / `font-sans` を活用

### create-next-app の「files conflict」エラー
- 既存ファイルがあるディレクトリでは実行できない
- **対処**: 別ディレクトリで作成してからコピー
