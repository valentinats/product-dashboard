import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginFormData,
} from "@/features/auth/utils/validation";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Input } from "@/shared/components/ui/Input";
import { PasswordInput } from "@/features/auth/components/PasswordInput";
import { Checkbox } from "@/shared/components/ui/Checkbox";
import { Button } from "@/shared/components/ui/Button";
import { useState } from "react";

export function LoginForm() {
  const { login } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setApiError(null);
      await login(
        {
          username: data.username,
          password: data.password,
        },
        data.rememberMe,
      );
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "Ошибка авторизации",
      );
    }
  };

  const handleRegisterClick = () => {
    alert("Регистрация недоступна");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {apiError}
        </div>
      )}

      <Input
        {...register("username")}
        label="Почта"
        type="text"
        placeholder="test@mail.ru"
        error={errors.username?.message}
      />

      <PasswordInput
        {...register("password")}
        label="Пароль"
        placeholder="••••••••"
        error={errors.password?.message}
      />

      <Checkbox {...register("rememberMe")} label="Запомнить данные" />

      <Button
        type="submit"
        className="w-full"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        Войти
      </Button>

      <div className="relative mt-4">
        <div className="relative flex justify-center items-center text-base">
          <span className="w-full border-b border-gray-30"></span>
          <span className="px-[10px] bg-white text-gray-10 font-medium inner-shadow-text">
            или
          </span>
          <span className="w-full border-b border-gray-30"></span>
        </div>
      </div>

      <p className="mt-[32px] text-center text-[18px] text-gray-50 leading-[150%]">
        Нет аккаунта?{" "}
        <button
          type="button"
          onClick={handleRegisterClick}
          className="text-accent font-semibold underline underline-offset-4"
        >
          Создать
        </button>
      </p>
    </form>
  );
}
