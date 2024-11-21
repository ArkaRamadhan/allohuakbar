import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, loginValue } from "@/features/Auth/config/zod";
import { Toast } from "@/components/Elements/Toast";
import { usePostData } from "@/features/MainData/hooks/useAPI";
import { useCallback } from "react";

export default function LoginForm() {
  const navigate = useNavigate();

  const Login = usePostData({
    axios: {
      url: "/user/login",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = useCallback(
    async (values: loginValue) => {
      await Login.mutateAsync(values as any, {
        onSuccess: ({ data }: any) => {
          Toast("success", "Login Berhasil!", data.message);
        },
        onError: ({ response }: any) => {
          Toast("error", "Login Gagal!", response.data.message);
        },
      }).then(() => navigate("/dashboard"));
    },
    [Login]
  );

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="mx-auto">
      <div className="relative z-0 w-full mb-5 group">
        <input
          id="email"
          type="email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=""
          {...register("email")}
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Email address
        </label>
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          id="password"
          type="password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=""
          {...register("password")}
        />
        <label
          htmlFor="password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Password
        </label>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <div className="grid grid-cols-5 gap-2">
        <Link
          to="/"
          type="button"
          className="col-span-1 text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">
          <svg
            className="w-6 h-6 text-slate-100 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14M5 12l4-4m-4 4 4 4"
            />
          </svg>
        </Link>
        <button
          disabled={Login.isPending}
          type="submit"
          className="col-span-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">
          Login
        </button>
      </div>
    </form>
  );
}
