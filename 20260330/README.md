# 2026-03-30 useState と useRef の違いの確認用コード

このディレクトリは、以下のブログ記事を書いた際に動作確認したコードをまとめたものです。

- https://zenn.dev/raccoon/articles/007b1f2a75d9e9

記事内で扱っている次の観点を、実際に手元で確認できるようにしています。

- useState は UI に反映される状態を持ち、更新時に再レンダーを起こす
- useRef は再レンダーを発生させずに値や参照を保持する
- ref.current の更新は、それ単体では useEffect の再実行トリガーにならない
- DOM 参照や外部ライブラリ連携では ref が自然に使われる

主なサンプル

- src/components/StateVsRefCounter: state と ref の更新差分、および useEffect との関係を確認するサンプル
- src/components/FocusInputWithRef: input 要素へフォーカスを当てる基本的な ref 利用例
- src/components/ReactHookFormRefExample: react-hook-form が ref システムをどう使うかを見る最小例
- src/App.tsx: callback ref を使って要素参照を保持し、スクロール制御する例

起動方法

```bash
pnpm install
pnpm dev
```

devcontainer を使う場合は、20260330 を VS Code で開いてコンテナを再作成すると、Node.js 24 系と pnpm を使える状態で確認できます。
