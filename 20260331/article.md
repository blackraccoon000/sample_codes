# JavaScriptの「等価」を整理する。`==` と `===`、あと object 比較の話

この前、JavaScriptの等価演算子の話をしている流れで、こんな質問を受けました。

「プリミティブ値の比較と違って、object の比較って何が違うんでしたっけ？」

分かる。すごく分かる。

普段は何となく使い分けていても、いざ言葉で説明しようとすると一瞬詰まるやつです。
しかもその場で私は、プリミティブ値って何だっけとなり、勢いで null って object 扱いなんですよねと言ってしまいました。

いや、違うんだけど、そうなんです。

今回はその反省も込めて、JavaScriptの「等価」をまとめて整理しておきます。

## 先にざっくり結論

最初に雑にまとめると、こんな感じです。

- 普段は `===` を使う
- `==` は型変換が入るので、思わぬ `true` を生みやすい
- ただし `value == null` だけは、`null` と `undefined` をまとめて見たい場面で割と実用的
- object は見た目が同じでも、中身ではなく参照で比較される
- object の値をちゃんと比較したいなら、プロパティごとに見るか、用途次第でライブラリを使う

ここから順番に見ていきます。

## `==` と `===` は何が違うのか

まずはここです。

`===` は、型も値も一致したときだけ `true` になります。

```javascript
console.log(null === undefined); // false
console.log(0 === 0n); // false
console.log(0 === "0"); // false
console.log(false === 0); // false
```

かなり素直です。
違う型なら、だいたい false です。

一方で `==` は、比較の途中で型変換が入ります。

```javascript
console.log(null == undefined); // true
console.log(0 == 0n); // true
console.log(0 == "0"); // true
console.log(0 == false); // true
console.log("" == false); // true
```

このあたりを見ると、便利そうにも見えるし、怖くも見えます。

個人的には、`==` が悪というより、読む側が毎回変換ルールを思い出さないといけないのがしんどい、という感覚です。
なので、普段のコードでは基本 `===` に寄せるのがやっぱり楽です。

## で、null って object なの？

ここで一回、私がその場で転んだポイントに戻ります。

JavaScriptではこうなります。

```javascript
console.log(typeof null); // object
```

これだけ見ると、じゃあ null は object じゃんとなるんですが、実際には null 自体はプリミティブ値です。
`typeof null` が `object` になるのは、歴史的事情を引きずった有名な挙動です。

つまり、こういう判定はちょっと危ない。

```typescript
function isObject(value: unknown): value is object {
  return typeof value === "object";
}
```

これだと `null` まで object 扱いしてしまいます。

型ガードを書くときは、少なくとも null を除外しておいたほうが安全です。

```typescript
function isNonNullObject(
  value: unknown,
): value is Record<PropertyKey, unknown> {
  return typeof value === "object" && value !== null;
}
```

この話、知識としては有名なんですが、レビュー中とか会話の途中だと意外と口が滑るんですよね。
なので、今回みたいに一度ちゃんと文章にしておくのは大事だなと思いました。

## object 比較では何が起きているのか

本題です。

プリミティブ値の比較と違って、object は中身そのものではなく、どの参照を見ているかで比較されます。

```javascript
console.log({} == {}); // false
console.log({} === {}); // false
console.log({ age: 18 } == { age: 18 }); // false
console.log({ equipment: "glasses" } === { equipment: "glasses" }); // false

const obj = { hair: "blond" };
console.log(obj === obj); // true
```

同じ見た目なのに false で、同じ変数をもう一回比べたときだけ true になるのはこのためです。

言い換えると、こういうことです。

- プリミティブ値は値を比較する
- object は参照を比較する

ここが腹落ちすると、object の比較結果はだいぶ自然に見えるようになります。

## じゃあ object の値を比較したいときは？

ここからは実務寄りの話です。

### 単一プロパティなら、その値を比較する

これはシンプルです。

```javascript
const obj1 = { book: "独習JavaScript" };
const obj2 = { book: "独習JavaScript" };

console.log(obj1.book === obj2.book); // true
```

比較したいのが一部の値だけなら、必要なプロパティだけ取り出して比較するのが一番分かりやすいです。

### 浅い比較なら every を使う

複数のプロパティをまとめて見たいなら、少なくとも全部のキーが一致したら true になる形にしておく必要があります。

```typescript
function shallowEqual<T extends Record<PropertyKey, unknown>>(
  left: T,
  right: T,
): boolean {
  const leftKeys = Object.keys(left) as (keyof T)[];
  const rightKeys = Object.keys(right) as (keyof T)[];

  return (
    leftKeys.length === rightKeys.length &&
    leftKeys.every((key) => left[key] === right[key])
  );
}

const objectA = { name: "Alice", age: 30, completed: true };
const objectB = { name: "Alice", age: 30, completed: true };

console.log(shallowEqual(objectA, objectB)); // true
console.log(objectA === objectB); // false
```

このとき、`some` を使うと 1個でも一致したら true になってしまいます。
それは「部分一致」の判定としてはありですが、「等しいか」を見るには条件が緩すぎます。

### ネストしてきたらライブラリを考える

object の中に object が入る、array もある、日付型もある、みたいな話になってくると、自前実装はすぐ面倒になります。

そのあたりまで含めてちゃんと見たいなら、lodash の isEqual みたいな選択肢を使うほうが保守しやすいです。

- https://lodash.com/docs/#isEqual

```javascript
var object = { a: 1 };
var other = { a: 1 };

_.isEqual(object, other);
// => true

object === other;
// => false
```

もちろん、何でもかんでもライブラリという話ではなくて、要件と依存コスト次第です。
でも深い比較を毎回自前で書き始めると、だいたいどこかでつらくなります。

## まとめ

JavaScriptの「等価」は、見ている対象が値なのか参照なのかで雰囲気がかなり変わります。

- `===` は型と値を厳密に比較する
- `==` は型変換が入る
- `null` はプリミティブ値だけど、`typeof null` は `object` になる
- object は中身ではなく参照で比較される

なので普段の指針としては、私はこんな感じで考えるのが楽だと思っています。

- 基本は `===`
- `null` と `undefined` をまとめて見たいときだけ `== null`
- object の中身を見たいときは、比較したい粒度に合わせてやり方を選ぶ

今回みたいに、人に説明しようとして「あれ、これ何だっけ」となるところは、だいたい自分の理解がまだ言語化し切れていないところなんだと思います。
object 比較も null も、その典型でした。

次に同じ質問を受けたら、今度はもう少しマシに答えたいです。
