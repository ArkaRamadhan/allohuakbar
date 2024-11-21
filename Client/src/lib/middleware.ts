import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToken } from "../hooks/useToken";

export function MiddlewareProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useToken();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, pathname]);

  return children;
}
