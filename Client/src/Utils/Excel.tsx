import { useCallback, useEffect, useState } from "react";
import useAxios from "@/config/axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TimerToast } from "@/components/Elements/Toast";
import { DynamicForm } from "@/features/MainData/components/Sections/Form/DynamicForm";
import { useFormStore } from "@/features/MainData/store/FormStore";
import { ExcelFields } from "@/config/FormConfig/excel";
import { usePostData } from "@/features/MainData/hooks/useAPI";
import clsx from "clsx";
import { useQueryClient } from "@tanstack/react-query";
import { useToken } from "@/hooks/useToken";

type ExcelProps = {
  link?: {
    exportThis?: string;
    import?: string;
    exportAll?: string;
  };
  invalidateKey: string[];
};

export function Excel({ link, invalidateKey }: ExcelProps) {
  const axiosInstance = useAxios();

  const queryClient = useQueryClient();

  const exportAll = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`${link?.exportAll}/exportAll`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = url;
      a.setAttribute("download", "all_sheets.xlsx");
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      TimerToast("error", "Gagal!", "Error saat mengekspor data:");
    }
  }, []);

  const Import = usePostData({
    axios: {
      url: `${link?.import}`,
    },
  });

  const handleSubmit = useCallback(
    async (values: any) => {
      if (fields !== ExcelFields) {
        setFields(ExcelFields);
        return;
      }
      const formData = new FormData();
      formData.append("file", values.file);
      await Import.mutateAsync(formData as any, {
        onSuccess: ({ data }: any) => {
          TimerToast("success", "File berhasil ditambahkan!", data.message);
        },
        onError: ({ response }: any) => {
          TimerToast("error", "Data gagal ditambahkan!", response.data.message);
        },
      })
        .then(() => Import.reset())
        .finally(() => {
          queryClient.invalidateQueries({ queryKey: invalidateKey });
          setFields([]);
        });
    },
    [Import]
  );

  const { fields, setFields } = useFormStore();

  const [isOpen, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setFields([]);
    }
  }, [isOpen]);

  const {
    userDetails: { role },
  } = useToken();

  // AUTHORIZATION
  if (role === "admin") {
    return (
      <div className="flex gap-1.5 items-center size-full justify-center">
        <DropdownMenu open={isOpen} onOpenChange={(open:boolean) => setOpen(open)}>
          <DropdownMenuTrigger className="size-full" asChild>
            <Button className="bg-green-600 hover:bg-green-700 rounded">
              Excel
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col gap-4 p-4">
            {/* EXPORT */}
            {link?.exportThis && (
              <div
                className={clsx(
                  { "grid-cols-2": link?.exportAll },
                  "grid grid-cols-1 gap-2 p-2 shadow"
                )}>
                <Label className="col-span-2">Export</Label>
                <DropdownMenuItem
                  asChild
                  className="col-span-1 bg-green-600 hover:bg-green-700 text-white rounded">
                  <Link
                    className="text-center w-full"
                    to={`http://localhost:5000/${link?.exportThis}`}>
                    Sheet ini saja
                  </Link>
                </DropdownMenuItem>
                {link?.exportAll && (
                  <DropdownMenuItem
                    asChild
                    className="col-span-1 bg-green-600 hover:bg-green-700 text-white rounded">
                    <span className="text-center w-full" onClick={exportAll}>
                      Semua sheet
                    </span>
                  </DropdownMenuItem>
                )}
              </div>
            )}
            {/* END EXPORT */}
            {/* IMPORT */}
            {link?.import && (
              <div className="p-2 shadow">
                <DynamicForm onSubmit={handleSubmit} type="excel" />
              </div>
            )}
            {/* END IMPORT */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
}
