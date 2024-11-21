import { ConfirmToast, TimerToast } from "@/components/Elements/Toast";
import { UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

interface Props {
  mutation: UseMutationResult<unknown, Error, void, unknown>;
  keyField: string;
  queryKey: string[];
}

export const useSelectionDeletion = ({
  keyField,
  mutation,
  queryKey,
}: Props) => {
  const queryClient = useQueryClient();

  const handleSelectedDeletion = useCallback(
    (selected: any[]) => {
      ConfirmToast(
        "warning",
        "Apakah Anda yakin?",
        "Anda akan menghapus data yang dipilih!"
      ).then(async (result) => {
        if (result.isConfirmed) {
          await Promise.all(
            selected.map(async (data) => {
              await mutation.mutateAsync(data[keyField]);
            })
          )
            .then(() => {
              TimerToast("success", "Data berhasil dihapus!");
              queryClient.invalidateQueries({ queryKey: queryKey });
            })
            .catch(() => {
              TimerToast("error", "Data gagal dihapus!");
            });
        }
      });
    },
    [mutation, queryClient]
  );

  return { handleSelectedDeletion };
};
