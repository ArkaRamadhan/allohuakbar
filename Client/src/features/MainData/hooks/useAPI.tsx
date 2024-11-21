import useAxios from "@/config/axios";
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";

interface Query extends UseQueryOptions {
  axios: {
    url: string;
    options?: any;
  };
}

interface Mutate extends UseMutationOptions {
  axios: {
    url: string;
    options?: any;
  };
}

interface MutateId extends UseMutationOptions {
  axios: {
    url: string;
    id: string | number;
    options?: any;
  };
}

export function useFetchData({
  axios: { url, options },
  ...queryOptions
}: Query) {
  const axiosInstance = useAxios();
  return useQuery({
    queryFn: async () => await axiosInstance.get(url, options),
    ...queryOptions,
  });
}

export function usePostData({
  axios: { url, options },
  ...queryOptions
}: Mutate) {
  const axiosInstance = useAxios();
  return useMutation({
    mutationFn: async (body: any) => {
      return await axiosInstance.post(url, body, options);
    },
    ...queryOptions,
  });
}

export function useDeleteData({
  axios: { url, options },
  ...queryOptions
}: Mutate) {
  const axiosInstance = useAxios();
  return useMutation({
    mutationFn: async (id) => {
      return await axiosInstance.delete(`${url}/${id}`, options);
    },
    ...queryOptions,
  });
}

export function usePutData({
  axios: { url, id, options },
  ...queryOptions
}: MutateId) {
  const axiosInstance = useAxios();
  return useMutation({
    mutationFn: async (body: any) => {
      return await axiosInstance.put(`${url}/${id}`, body, options);
    },
    ...queryOptions,
  });
}
