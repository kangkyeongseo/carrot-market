import { FieldError, FieldErrors, useForm } from "react-hook-form";

interface ILoginForm {
  username: string;
  email: string;
  password: string;
  error?: string;
}

export default function Forms() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<ILoginForm>({ mode: "onChange" });
  const onValid = (data: ILoginForm) => {
    setError("error", { message: "Backend is offline" });
    reset();
  };
  const onInValid = (error: FieldErrors) => {
    console.log(error);
  };
  console.log(watch("email"));
  return (
    <form onSubmit={handleSubmit(onValid, onInValid)}>
      <input
        {...register("username", {
          required: "User name is required",
          minLength: {
            message: "The username should be longer than 5 char",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      {errors.username?.message}
      <input
        {...register("email", {
          required: "Email name is required",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "Gmail is not allowed",
          },
        })}
        type="email"
        placeholder="Email"
        className={`${Boolean(errors.email?.message) ? "border-red-500" : ""}`}
      />
      {errors.email?.message}
      <input
        {...register("password", { required: "Password name is required" })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
      {errors.password?.message}
      {errors.error?.message}
    </form>
  );
}
