# 導入判断フローチャート

> この文書は Turborepo 導入判断の検討メモとしてまとめたもの。

## 先に短く答える

「初期設定が重そうで迷う」なら、まずは次の 2 択で判断すると早いです。

- 今すぐ困っていない: workspaces + scripts で継続
- すでに困っている: Turborepo を導入検討

ここでいう「困っている」は、実行順序の崩れ、codegen 同期ミス、CI の長時間化が繰り返し起きる状態を指します。

## まず押さえること

判断の順番は、いきなり「Turborepo が必要か」ではありません。

1. そもそもモノレポで管理すべきか
2. workspaces だけで足りるか
3. それでも Turborepo を載せる価値があるか

この順で判断すると、過剰導入を避けやすくなります。

---

## フローチャート

```mermaid
flowchart TD
    A[複数アプリまたは共有パッケージがあるか] -->|いいえ| B[単一アプリ中心なら workspace なしでもよい]
    A -->|はい| C[共通設定や内部パッケージを一元管理したいか]
    C -->|いいえ| D[ポリレポ継続を検討]
    C -->|はい| E[まずは workspaces を採用]
    E --> F[OpenAPI や codegen を複数パッケージへ同期反映したいか]
    F -->|いいえ| G[workspace + scripts で十分な可能性が高い]
    F -->|はい| H[generate から lint typecheck test build まで順序制御したいか]
    H -->|いいえ| I[workspace 中心で様子を見る]
    H -->|はい| J[CI 時間や再実行コストが問題になっているか]
    J -->|いいえ| K[将来の複雑化を見込むなら先行導入を検討]
    J -->|はい| L[Turborepo 導入価値が高い]
    L --> M[常駐 dev server は Compose などへ分離する]
```

---

## 判断表

| 質問                                  | Yes のとき             | No のとき                                       |
| ------------------------------------- | ---------------------- | ----------------------------------------------- |
| 複数アプリや共有パッケージがあるか    | モノレポ検討へ進む     | 単一 repo 継続で十分なことが多い                |
| 共通設定をまとめたいか                | workspaces が有力      | repo 分離のままでもよい                         |
| OpenAPI や codegen を同期管理したいか | Turbo の価値が上がる   | workspace だけでも足りる可能性が高い            |
| タスク順序を保証したいか              | Turbo の価値が上がる   | npm scripts や task runner でも足りることがある |
| CI を短縮したいか                     | cache と filter が効く | 導入優先度は落ちる                              |
| dev server を相互依存でまとめたいか   | Compose 併用設計が必要 | Turbo 単体でも整理しやすい                      |

---

## 実務用の導入基準

### 導入したほうがよい

- packages/api-contract のような契約パッケージがある
- generated client や generated validator を複数 consumer が使う
- 共有 tsconfig、lint、formatter を repo 標準として持ちたい
- PR ごとに全件 build/test するのが重い
- 変更影響範囲を repo 全体で安全に見たい

### まだ待ってよい

- web と api しかなく、shared package もほぼない
- codegen や内部ライブラリがない
- CI が軽く、全件実行でも十分速い
- チームが monorepo 運用そのものにまだ慣れていない

---

## 説明用の短文

「共通設定をまとめるだけなら workspace でも十分です。Turborepo が必要になるのは、生成・検証・ビルドを依存順に安全かつ高速に回したい場合です。特に OpenAPI 由来の codegen を複数パッケージへ同期反映したい場合、初期設定コストを上回る価値が出やすくなります。」
