import App from "@/components/Layouts/App";
import { useFetchData } from "../../hooks/useAPI";
import { ConfirmToast, TimerToast } from "@/components/Elements/Toast";
import { useFormStore } from "../../store/FormStore";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import ConflictLoading from "../../components/Elements/Loading/ConflictLoading";
import { useQueryClient } from "@tanstack/react-query";
import { useToken } from "@/hooks/useToken";
import NotFound from "@/pages/Error/404";

export default function Request() {
  const {
    userDetails: { role },
  } = useToken();

  // FETCH REQUEST
  const { data: GetRequest, isLoading: LoadingRequest } = useFetchData({
    queryKey: ["conflictRequests"],
    axios: {
      url: "kegiatan/request?status=pending",
    },
    // AUTHORIZATION
    enabled: role === "admin",
  });

  const { initialData, setInitialData } = useFormStore();

  const { refetch: Acc } = useFetchData({
    queryKey: ["accRequests"],
    axios: {
      url: `/AccRequest/${initialData.id}`,
    },
    enabled: false,
  });

  const { refetch: Cancel } = useFetchData({
    queryKey: ["cancelRequests"],
    axios: {
      url: `/CancelRequest/${initialData.id}`,
    },
    enabled: false,
  });

  const queryClient = useQueryClient();

  const handleAccept = useCallback(
    async (id: any) => {
      setInitialData({ id });
      ConfirmToast("question", "Accept Request?").then(async (result) => {
        if (result.isConfirmed) {
          Acc()
            .then(({ data }: any) => {
              TimerToast("success", "Berhasil!", data.message);
            })
            .catch(({ response }: any) => {
              TimerToast("error", "Gagal!", response.data.message);
            })
            .finally(() => {
              setInitialData({});
              queryClient.invalidateQueries({ queryKey: ["conflictRequests"] });
            });
        }
      });
    },
    [initialData, Acc]
  );

  const handleCancel = useCallback(
    async (id: any) => {
      setInitialData({ id });
      ConfirmToast("question", "Cancel Request?").then(async (result) => {
        if (result.isConfirmed) {
          Cancel()
            .then(({ data }: any) => {
              TimerToast("success", "Berhasil!", data.message);
            })
            .catch(({ response }: any) => {
              TimerToast("error", "Gagal!", response.data.message);
            })
            .finally(() => {
              setInitialData({});
              queryClient.invalidateQueries({ queryKey: ["conflictRequests"] });
            });
        }
      });
    },
    [initialData, Cancel]
  );

  // AUTHORIZATION
  if (role !== "admin") {
    <NotFound />;
  } else {
    return (
      <App services="Request">
        {LoadingRequest ? (
          <ConflictLoading />
        ) : (
          <div className="p-[2rem] grid grid-cols-3">
            {Array.isArray(GetRequest) && GetRequest?.length > 0 ? (
              GetRequest?.map((conflict, index) => {
                return (
                  <div
                    key={index}
                    className="w-full ring ring-gray-200 rounded-md p-4 mb-4">
                    <span>
                      <h3 className="font-bold">Data Bentrok !</h3>
                      <p>
                        Jadwal rapat <b>{conflict.title}</b>
                      </p>
                      <p>
                        bentrok pada tanggal <b>{conflict.start}</b>
                      </p>
                    </span>
                    <div className="w-full flex gap-2">
                      <Button
                        onClick={() => handleAccept(conflict.id)} // Pass ID to handleAccept
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2">
                        Acc
                      </Button>
                      <Button
                        onClick={() => handleCancel(conflict.id)} // Pass ID to handleCancel
                        className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2">
                        Cancel
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-3 text-2xl font-bold w-full h-[70vh] flex justify-center items-center">
                Tidak ada jadwal bentrok
              </div>
            )}
          </div>
        )}
      </App>
    );
  }
}
