# Nx と Lerna との比較

> この文書は Turborepo 導入判断の検討メモとしてまとめたもの。

## この文書を読むタイミング

「今は無理に入れなくていいかも」と判断したあとに、将来どの方向へ拡張するかを見たいときに読む比較資料です。

今ほしいのが高速なタスク実行だけなのか、境界管理まで含めた統制なのか、publish 運用なのかで選択肢が変わります。

## 先に結論

実務観点では、次の整理が分かりやすいです。

- Turborepo: できるだけ軽く、速く、シンプルにモノレポのタスクを回したいとき
- Nx: ルール、可視化、生成、境界管理まで含めて大きめのモノレポを統制したいとき
- Lerna: publish や versioning の整理が主目的で、タスク実行は他ツールと組み合わせたいとき

つまり、Turborepo は「高速な task orchestrator」、Nx は「統制を含む monorepo platform」、Lerna は「versioning / publishing の補助ツール」と整理すると理解しやすくなります。

---

## 比較表

| 観点               | Turborepo                          | Nx                                                   | Lerna                                  |
| ------------------ | ---------------------------------- | ---------------------------------------------------- | -------------------------------------- |
| 主な役割           | タスク実行、キャッシュ、依存順制御 | タスク実行、キャッシュ、コード生成、境界管理、可視化 | versioning、publishing、workspace 補助 |
| 導入の軽さ         | 軽い                               | やや重い                                             | 軽め                                   |
| 学習コスト         | 低めから中程度                     | 中程度から高め                                       | 低め                                   |
| キャッシュ         | 強い                               | 強い                                                 | 単体では弱い                           |
| 影響範囲実行       | 強い                               | 強い                                                 | 限定的                                 |
| codegen との相性   | 良い                               | 良い                                                 | 補助的                                 |
| アーキテクチャ統制 | 弱い                               | 強い                                                 | 弱い                                   |
| package publish    | 外部ツール併用が前提               | 外部併用または plugin                                | 比較的得意                             |
| 小中規模モノレポ   | とても相性が良い                   | 過剰になることがある                                 | 用途次第                               |
| 大規模組織モノレポ | 追加ルールが要る                   | 相性が良い                                           | 単体では不足しやすい                   |

---

## Turborepo と Nx の違い

### Turborepo が向く場面

- まずは高速な task orchestrator がほしい
- turbo.json と package scripts を中心にシンプルに保ちたい
- OpenAPI generate、lint、typecheck、test、build を順序付きで回したい
- 小規模から中規模で、重いフレームワーク感は避けたい

### Nx が向く場面

- repo が大きく、境界違反や依存方向を強制したい
- generator や plugin でプロジェクト規約を自動化したい
- package graph や affected 実行をより強く組織運用に組み込みたい
- 複数チームで長期に育てる大型モノレポに寄せたい

### 実務的な違い

Turborepo は、必要機能に絞って短期間で導入しやすい点が強みです。一方で Nx は、repo 統制やスキャフォールドまで初期段階から組み込みたい場合に強みがあります。

まずは OpenAPI 契約、shared config、複数 app の generate と検証を安定して回したい段階では、Turborepo が適合しやすいケースが多くなります。

---

## Turborepo と Lerna の違い

Lerna は monorepo 文脈で長く使われてきましたが、現在の位置づけは以前とやや異なります。

- 以前: monorepo 運用全般を支える代表格として見られやすかった
- 現在: publish、versioning、workspace 補助などに重心が寄りやすい

そのため、現在は次の理解が実態に近いです。

- タスク実行最適化を主目的にするなら Turborepo
- npm package の versioning や publish 運用を主目的にするなら Lerna

アプリケーション中心のモノレポでは、Lerna 単体より Turborepo や Nx のほうが要件に合いやすいケースが多くなります。

---

## どれを選ぶべきか

### Turborepo を選びやすい

1. アプリケーション中心のモノレポ
2. OpenAPI や codegen を依存順で回したい
3. 共有設定と CI 高速化をまず整えたい
4. 導入コストを抑えたい

### Nx を選びやすい

1. 複数チームで repo 境界を厳密に運用したい
2. generator や plugin による標準化が重要
3. 大規模モノレポの統制を優先したい

### Lerna を選びやすい

1. ライブラリ publish が主目的
2. バージョン戦略と release 管理を中心に考えたい
3. task orchestration は別ツールで補う前提がある

---

## 面接や説明での短い言い方

「Turborepo は軽量で高速な task orchestrator、Nx は統制まで含めた monorepo platform、Lerna は publish と versioning 寄りのツールです。アプリ中心で OpenAPI 生成や shared config の同期が主眼なら、まず Turborepo が選びやすいです。」
