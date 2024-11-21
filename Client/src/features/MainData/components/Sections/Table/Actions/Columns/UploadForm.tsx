import React, { useCallback } from "react";
import Modal from "@/components/Elements/Modal";
import { DynamicForm } from "@/features/MainData/components/Sections/Form/DynamicForm";
import {
  CloseButton,
  DeleteButton,
  DownloadButton,
  UploadButton,
} from "../Buttons";
import { useModalStore } from "@/features/MainData/store/ModalStore";
import {
  useDeleteData,
  useFetchData,
  usePostData,
} from "@/features/MainData/hooks/useAPI";
import {
  useFileStore,
  useFormStore,
} from "@/features/MainData/store/FormStore";
import { TimerToast } from "@/components/Elements/Toast";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import UploadLoading from "@/features/MainData/components/Elements/Loading/UploadLoading";

interface UploadFormProps {
  title: string;
  event: {
    onOpen: () => void;
    onClose: () => void;
  };
  url: {
    getUrl: string;
    postUrl: string;
    downloadUrl: string;
    deleteUrl: string;
  };
}

const UploadForm: React.FC<UploadFormProps> = ({
  title,
  event: { onOpen, onClose },
  url: { getUrl, postUrl, downloadUrl, deleteUrl },
}) => {
  const {
    modals: { uploadModal },
    openModal,
    closeModal,
  } = useModalStore();
  const { initialData } = useFormStore();

  // INVALIDATE DATA
  const queryClient = useQueryClient();

  // GET FILES
  const { data: GetFiles = [], isLoading } = useFetchData({
    queryKey: ["files", initialData.ID],
    axios: {
      url: `${getUrl}/${initialData?.ID}`,
    },
    enabled: uploadModal,
  });

  // ADD FILES
  const mutation = usePostData({
    axios: {
      url: postUrl,
    },
  });

  // HANDLE ADD FILE
  const handleSubmit = useCallback(
    async (values: any) => {
      const formData = new FormData();
      formData.append("file", values.file);
      formData.append("id", initialData?.ID);
      await mutation
        .mutateAsync(formData as any, {
          onSuccess: ({ data }: any) => {
            TimerToast("success", "File berhasil ditambahkan!", data.message);
          },
          onError: ({ response }: any) => {
            TimerToast(
              "error",
              "Data gagal ditambahkan!",
              response.data.message
            );
          },
        })
        .then(() =>
          queryClient.invalidateQueries({ queryKey: ["files", initialData.ID] })
        )
        .then(() => mutation.reset());
    },
    [mutation, closeModal, queryClient]
  );

  // SETFILE
  const { file, setFile, setFileAsync } = useFileStore();

  // DOWNLOAD FILE
  const { refetch: download } = useFetchData({
    queryKey: ["downloadFile", initialData.ID],
    axios: {
      url: `${downloadUrl}/${initialData?.ID}/${file}`,
      options: {
        responseType: "blob",
      },
    },
    enabled: false,
  });

  // HANDLE DOWNLOAD FILE
  const handleDownload = useCallback(
    async (selectedFile: any) => {
      try {
        // SIMPAN FILE
        await setFileAsync(selectedFile);
        // API DOWNLOAD
        await download()
          .then(({ data: blob }) => {
            const url = window.URL.createObjectURL(blob as Blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = selectedFile;
            document.body.appendChild(a);
            a.click();
            a.remove();
          })
          .catch(() => {
            throw new Error("Download failed or no data available");
          });
      } catch (error) {
        TimerToast("error", "Download failed", String(error));
      } finally {
        queryClient.invalidateQueries({
          queryKey: ["downloadFile", initialData.ID],
        });
        setFile({});
      }
    },
    [download, setFile]
  );

  // DELETE FILE
  const DeleteFile = useDeleteData({
    axios: {
      url: `${deleteUrl}`,
    },
  });

  // HANDLE DELETE FILE
  const handleDelete = useCallback(
    async (selectedFile: string) => {
      await DeleteFile.mutateAsync(
        (initialData.ID + "/" + selectedFile) as any,
        {
          onSuccess: ({ data }: any) => {
            TimerToast("success", "Data berhasil dihapus!", data.message);
          },
          onError: ({ response }: any) => {
            TimerToast("error", "Data gagal dihapus!", response.data.message);
          },
        }
      )
        .then(() => queryClient.invalidateQueries({ queryKey: ["files"] }))
        .then(() => DeleteFile.reset())
        .finally(() => setFile({}));
    },
    [DeleteFile]
  );

  return (
    <Modal
      isOpen={uploadModal}
      trigger={{
        onOpen: (
          <div className="relative">
            <UploadButton
              onClick={() => {
                openModal("uploadModal");
                onOpen();
              }}
            />
          </div>
        ),
        onClose: (
          <CloseButton
            onClick={() => {
              closeModal("uploadModal");
              onClose();
            }}
          />
        ),
      }}>
      <Modal.Title>{title}</Modal.Title>
      <Modal.Content>
        <DynamicForm onSubmit={handleSubmit} type="upload" />
        <ul className="flex flex-col gap-[.5rem] mt-[1rem]">
          {!isLoading ? (
            (GetFiles as any)?.map((file: any, index: number) => (
              <li
                key={index}
                className="max-w-md flex justify-between items-center gap-4 ">
                <h1 className="font-bold text-base whitespace-nowrap overflow-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400">
                  {file}
                </h1>
                <div className="flex gap-2">
                  <DownloadButton
                    onClick={() => {
                      handleDownload(file);
                    }}
                  />
                  <DeleteButton
                    onClick={() => {
                      handleDelete(file);
                    }}
                  />
                </div>
              </li>
            ))
          ) : (
            <UploadLoading />
          )}
        </ul>
      </Modal.Content>
    </Modal>
  );
};

export default UploadForm;
