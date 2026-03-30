import { useEffect, useRef } from "react";

export const FocusInputWithRef = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} placeholder="自動でフォーカスされる" />;
};