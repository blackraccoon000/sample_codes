# 2026-03-31 JS/TS「等価」の整理 `==` と `===`、あと object 比較の話のサンプルコード

このディレクトリは、JavaScript の「等価」を Node.js 上で確認するための最小構成です。
また、以下のブログ記事を書いた際に動作確認したコードをまとめたものです。

- https://zenn.dev/raccoon/articles/1e2e5136fb8e76

確認できること

- `===` と `==` の違い
- `typeof null` が `object` になる歴史的な罠
- `NaN`、`Symbol`、object 比較で引っかかりやすい点
- object の参照比較と、浅い値比較の例

主なファイル

- `src/index.ts`: 比較パターンを順番に実行する CLI
- `article.md`: ブログ記事向けに整理した草稿

実行方法

```bash
pnpm install
pnpm dev
```

一度だけ実行する場合

```bash
pnpm build
pnpm start
```

補足

ブラウザでも Node.js でも `==` と `===` の基本ルールは ECMAScript 仕様に従うため同じです。
このサンプルでは、ブラウザ固有オブジェクトに依存しない比較だけを Node.js で確認できるようにしています。
