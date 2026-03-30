import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

export const ReactHookFormRefExample = () => {
  const [submittedValues, setSubmittedValues] = useState<FormValues | null>(
    null,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    setSubmittedValues(values);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "#f5f5f4",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <section
        style={{
          width: "min(480px, 100%)",
          padding: 32,
          borderRadius: 20,
          background: "#ffffff",
          boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
        }}
      >
        <p
          style={{
            margin: "0 0 8px",
            color: "#0f766e",
            fontSize: "0.875rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          react-hook-form
        </p>
        <h1 style={{ margin: 0, fontSize: "2rem" }}>ref ベースの最小実装</h1>
        <p style={{ margin: "16px 0 24px", lineHeight: 1.7 }}>
          register で input に値を登録すると、react-hook-form が内部で ref
          を使って DOM を管理します。
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label style={{ display: "grid", gap: 8, marginBottom: 16 }}>
            <span>メールアドレス</span>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "メールアドレスは必須です",
              })}
              style={{
                padding: "12px 14px",
                border: "1px solid #d6d3d1",
                borderRadius: 12,
              }}
            />
            {errors.email ? (
              <span style={{ color: "#dc2626", fontSize: "0.875rem" }}>
                {errors.email.message}
              </span>
            ) : null}
          </label>

          <label style={{ display: "grid", gap: 8, marginBottom: 20 }}>
            <span>パスワード</span>
            <input
              type="password"
              placeholder="password"
              {...register("password", {
                required: "パスワードは必須です",
                minLength: {
                  value: 8,
                  message: "8文字以上で入力してください",
                },
              })}
              style={{
                padding: "12px 14px",
                border: "1px solid #d6d3d1",
                borderRadius: 12,
              }}
            />
            {errors.password ? (
              <span style={{ color: "#dc2626", fontSize: "0.875rem" }}>
                {errors.password.message}
              </span>
            ) : null}
          </label>

          <button
            type="submit"
            style={{
              border: 0,
              borderRadius: 9999,
              padding: "12px 18px",
              background: "#111827",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            送信
          </button>
        </form>

        {submittedValues ? (
          <pre
            style={{
              marginTop: 24,
              padding: 16,
              borderRadius: 12,
              background: "#f5f5f4",
              overflowX: "auto",
            }}
          >
            {JSON.stringify(submittedValues, null, 2)}
          </pre>
        ) : null}
      </section>
    </main>
  );
};
