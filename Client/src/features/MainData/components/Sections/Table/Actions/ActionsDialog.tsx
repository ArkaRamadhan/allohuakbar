import { Field } from "@/config/types";
import { Button } from "@/components/ui/button";
import { LucideMessageCircleWarning } from "lucide-react";
import dayjs from "@/lib/dayjs";

type DetailProps = {
  fields: Partial<Field>[];
  initialData: any;
};

export function DetailDialog({ fields, initialData }: DetailProps) {
  return (
    <div className="p-[1rem] mt-[1rem] ring ring-gray-500 rounded-lg">
      {fields.map((field, index) => (
        <div key={index} className="grid grid-cols-2">
          <h1 className="justify-self-start mb-1 font-semibold overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {field.label} :
          </h1>
          <p className="justify-self-start mb-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {field.type === "date"
              ? dayjs(initialData[field.name as any]).format(
                  "dddd, DD MMM YYYY"
                )
              : initialData[field.name as any]}
          </p>
        </div>
      ))}
    </div>
  );
}

type DeleteProps = {
  onSubmit: (values: any) => void;
};

export function DeleteDialog({ onSubmit }: DeleteProps) {
  return (
    <div className="flex flex-col justify-center text-center gap-4 p-[1rem] mt-[1rem] rounded-lg">
      <LucideMessageCircleWarning className="w-full size-[5rem] text-red-600" />
      <h1 className="text-xl font-bold text-black">
        Apakah anda yakin untuk menghapus data ini?
      </h1>
      <p className="text-lg font-medium">Aksi ini tidak dapat dikembalikan</p>
      <Button onClick={onSubmit} variant={"destructive"}>
        Hapus
      </Button>
    </div>
  );
}
