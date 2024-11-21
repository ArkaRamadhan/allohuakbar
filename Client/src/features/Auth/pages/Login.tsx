import LoginForm from "@/features/Auth/components/Fragments/LoginForm";
import AuthLayout from "@/features/Auth/components/layouts/AuthLayout";
import { useToken } from "@/hooks/useToken";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const { token } = useToken();

  if (token) {
    navigate("/dashboard");
  }
  return (
    <AuthLayout header="Aplikasi Divisi ITS">
      <LoginForm />
    </AuthLayout>
  );
};
