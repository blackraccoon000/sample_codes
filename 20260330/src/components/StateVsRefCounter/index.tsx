import { useEffect, useRef, useState } from "react";

export const StateVsRefCounter = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    console.log("✅ useEffect for count:", count);
  }, [count]);

  useEffect(() => {
    console.log("⚠️ useEffect for countRef.current:", countRef.current);
    /**
     * 警告が出る理由：
     * countRef.current は useEffect の依存配列に入っていますが、
     * useRef で作成されたオブジェクトの current プロパティは React の再レンダリングサイクルに影響を与えないため、React はこの依存関係が正しくないと警告しています。
     */
  }, [countRef.current]);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <h3>count (state): {count}</h3>
      <h3>countRef.current (ref): {countRef.current}</h3>

      <button onClick={() => setCount((currentCount) => currentCount + 1)}>
        state を更新（再レンダーあり）
      </button>

      <button
        onClick={() => {
          countRef.current += 1;
          console.log("ref updated:", countRef.current);
        }}
      >
        ref を更新（再レンダーなし）
      </button>
    </div>
  );
};