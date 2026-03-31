type Case = {
  label: string;
  value: boolean;
  note?: string;
};

function isNonNullObject(
  value: unknown,
): value is Record<PropertyKey, unknown> {
  return typeof value === "object" && value !== null;
}

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

const strictCases: Case[] = [
  { label: "null === undefined", value: null === undefined },
  { label: "0 === 0n", value: 0 === 0n },
  { label: '0 === "0"', value: 0 === "0" },
  { label: "false === 0", value: false === 0 },
  { label: 'false === ""', value: false === "" },
];

const looseCases: Case[] = [
  { label: "null == undefined", value: null == undefined },
  { label: "0 == 0n", value: 0 == 0n },
  { label: '0 == "0"', value: 0 == "0" },
  { label: '0 == ""', value: 0 == "" },
  { label: "0 == false", value: 0 == false },
  { label: '"0" == false', value: "0" == false },
  { label: '"" == false', value: "" == false },
  {
    label: '"" == "0"',
    value: "" == "0",
    note: "一見どちらも false と等しそうでも、これは false になる",
  },
  {
    label: "value == null",
    value: (() => {
      const value: string | null | undefined = undefined;
      return value == null;
    })(),
    note: "null または undefined をまとめて判定したい場合の典型例",
  },
];

const edgeCases: Case[] = [
  { label: "NaN == NaN", value: NaN == NaN },
  { label: "NaN === NaN", value: NaN === NaN },
  {
    label: 'Symbol("piano") == Symbol("piano")',
    value: Symbol("piano") == Symbol("piano"),
  },
  {
    label: 'Symbol("piano") === Symbol("piano")',
    value: Symbol("piano") === Symbol("piano"),
  },
  {
    label: "sameSymbol === sameSymbol",
    value: (() => {
      const sameSymbol = Symbol("piano");
      return sameSymbol === sameSymbol;
    })(),
  },
  { label: "{} == {}", value: {} == {} },
  { label: "{} === {}", value: {} === {} },
  {
    label: "sameObject === sameObject",
    value: (() => {
      const sameObject = { hair: "blond" };
      return sameObject === sameObject;
    })(),
  },
  {
    label: "Object.is(NaN, NaN)",
    value: Object.is(NaN, NaN),
    note: "NaN を等しいと判定したい場合は Object.is が使える",
  },
];

function printHeading(title: string): void {
  console.log(`\n${title}`);
  console.log("-".repeat(title.length));
}

function printCases(cases: Case[]): void {
  for (const testCase of cases) {
    const result = testCase.value ? "true " : "false";
    console.log(`${result}  ${testCase.label}`);

    if (testCase.note) {
      console.log(`       ${testCase.note}`);
    }
  }
}

printHeading("=== の確認");
printCases(strictCases);

printHeading("== の確認");
printCases(looseCases);

printHeading("注意が必要な値");
printCases(edgeCases);

printHeading("補足");
console.log(
  "基本方針としては === を使い、null と undefined をまとめて見る時だけ == null を検討する。",
);

printHeading("typeof と null");
console.log("typeof null:", typeof null);
console.log("isNonNullObject(null):", isNonNullObject(null));
console.log(
  "isNonNullObject({ answer: 42 }):",
  isNonNullObject({ answer: 42 }),
);

const objectA = { name: "Alice", age: 30, completed: true };
const objectB = { name: "Alice", age: 30, completed: true };
const sameReference = objectA;

printHeading("オブジェクト比較");
console.log("objectA === objectB:", objectA === objectB);
console.log("objectA === sameReference:", objectA === sameReference);
console.log("shallowEqual(objectA, objectB):", shallowEqual(objectA, objectB));
