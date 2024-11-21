import { useToken } from "@/hooks/useToken";
import { Detik } from "@/lib/time";
import axios from "axios";

const useAxios = () => {
  const { token } = useToken();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    withCredentials: true,
    timeout: Detik(20),
  });

  return axiosInstance;
};

export default useAxios;
