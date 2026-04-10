# Turborepo導入判断

## まずは一言で答える

「初期設定が煩雑で、そこまでして 1 つにまとめる必要があるか」という感覚は妥当です。

単一アプリ寄りの段階であれば、無理に Turborepo を導入しなくても問題ありません。まずは workspaces と scripts で十分に運用可能です。

一方で、次が必要になってきたら Turborepo の価値が一気に上がります。

- 複数パッケージをまたいだ generate、lint、typecheck、test、build の順序制御
- OpenAPI を正本にした codegen の同期運用
- CI の再実行コスト削減

詳細な判断材料は、このディレクトリに整理しています。

### 回答テンプレート（ビジネス向け）

「ご懸念は妥当です。現段階で単一アプリ寄りの構成であれば、無理に Turborepo へ移行する必要はありません。
まずは workspaces と scripts で運用し、複数パッケージの順序制御、OpenAPI の codegen 同期、CI 時間の増加が顕在化した段階で導入を検討するのが合理的です。
判断材料は 20260410/Turborepo導入判断 に整理しています。」

---

## このディレクトリで分かること

1. 初期設定コストを払う価値が出る条件
2. まだ導入しないほうがよい条件
3. なぜ今モノレポが再評価されているか
4. Turborepo / Nx / Lerna の使い分け

---

## 推奨の読み順

最短で判断したい場合は、次の順で参照してください。

1. [導入判断フローチャート](./02-adoption-flowchart.md)
2. [Turborepo のメリットとデメリット](./01-turborepo-merits-demerits.md)
3. [Nx と Lerna との比較](./04-nx-lerna-comparison.md)
4. [なぜ今モノレポが人気なのか](./03-why-monorepo-now.md)

---

## 目次（詳細）

| No. | ドキュメント                                                          | 内容                                                                         |
| --- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 01  | [Turborepo のメリットとデメリット](./01-turborepo-merits-demerits.md) | Turborepo の強み、弱み、誤解しやすい論点、向いているケースを整理する         |
| 02  | [導入判断フローチャート](./02-adoption-flowchart.md)                  | Turborepo を導入すべきかを判断するためのフローと実務基準を示す               |
| 03  | [なぜ今モノレポが人気なのか](./03-why-monorepo-now.md)                | 近年モノレポが支持される背景を、契約駆動開発、CI、開発体験の観点から整理する |
| 04  | [Nx と Lerna との比較](./04-nx-lerna-comparison.md)                   | Turborepo、Nx、Lerna の役割差分、向き不向き、選び分けを比較表で整理する      |

---

## 5秒判断

- まだ迷う段階: workspaces + scripts で継続
- 明確な課題がある段階: Turborepo の導入を検討

導入検討に進む目安:

- 変更のたびに全体の build/test が重い
- codegen と利用側の同期ミスが起きる
- パッケージ間の実行順序が崩れやすい

---

## このテーマで答えたいこと

1. Turborepo の価値はモノレポや workspaces とどう違うのか
2. どんなプロジェクトなら初期設定コストを払う価値があるのか
3. なぜここ数年モノレポが再評価されているのか
4. Nx や Lerna と比べたとき、Turborepo をどう位置づけるべきか
5. 実務で説明するときに、どの論点から話すと伝わりやすいのか

---

## 関連する検討テーマ

- Turborepo の導入可否
- npm / pnpm workspaces の使い分け
- モノレポ運用の実務設計

---

## 参考リンク

- [Turborepo 公式ドキュメント](https://turborepo.dev/docs)
- [Developing applications](https://turborepo.dev/docs/crafting-your-repository/developing-applications)
- [Configuring turbo.json](https://turborepo.dev/docs/reference/configuration)
- [Nx の比較記事](https://nx.dev/concepts/decisions/why-monorepos)
- [Lerna 公式ドキュメント](https://lerna.js.org/)
- [pnpm workspaces](https://pnpm.io/workspaces)
- [Monorepo tools](https://monorepo.tools/)
