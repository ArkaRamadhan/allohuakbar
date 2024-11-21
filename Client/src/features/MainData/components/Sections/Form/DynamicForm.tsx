import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";
import { useFormStore } from "@/features/MainData/store/FormStore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "@/lib/dayjs";

interface FormConfig {
  type: "add" | "edit" | "upload" | "excel";
  onSubmit: (values: any) => void;
}

export const DynamicForm = ({ type, onSubmit }: FormConfig) => {
  // FIELD DAN DETAIL DATA DARI PAGE
  const { initialData, fields } = useFormStore();

  // UNTUK VALIDASI ZOD
  const formSchema = z.object(
    fields.reduce((acc: Record<string, any>, field) => {
      acc[field.name as any] = field.validation;
      return acc;
    }, {})
  );

  // DEFAULT VALUE KOSONG
  const resetValue = fields.reduce((acc: Record<string, any>, field) => {
    acc[field.name as any] = "";
    return acc;
  }, {});

  // REACT HOOK FORM
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      Object.keys(initialData).length === 0 ? resetValue : initialData,
  });

  // RESET VALUE SETELAH SUBMIT
  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form.formState]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className={`grid ${
            fields.length > 1 ? "grid-cols-2" : "grid-cols-1"
          } gap-[1rem]  max-h-[60vh] overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 mb-4`}>
          {fields.map((col, idx) => {
            switch (col.type) {
              case "date":
                return (
                  <FormField
                    key={idx}
                    control={form.control}
                    name={col.name as string}
                    render={({ field: { value, onChange } }) => (
                      <FormItem className="mx-2 my-1">
                        <FormLabel>{col.label}</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !value && "text-muted-foreground"
                                )}>
                                {value ? (
                                  dayjs(value).format("dddd, DD MMM YYYY")
                                ) : (
                                  <span>Pilih tanggal</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto" align="start">
                            <Calendar
                              mode="single"
                              selected={value}
                              onSelect={(value) => {
                                const wkwk = new Date();
                                onChange(dayjs(value).format("YYYY-MM-DD"));
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );

              case "select":
                return (
                  <FormField
                    key={idx}
                    control={form.control}
                    name={col.name as string}
                    render={({ field }) => (
                      <FormItem className="mx-2 my-1">
                        <FormLabel>{col.label}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value || ""}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  field.value ? field.value : "Pilih"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {col.options?.map((option, optionIdx) => (
                              <SelectItem key={optionIdx} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );

              case "file":
                return (
                  <FormField
                    key={idx}
                    control={form.control}
                    name={col.name as string}
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem className="mx-2 my-1">
                        <FormLabel>{col.label}</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(event) =>
                              onChange(
                                event.target.files
                                  ? event.target.files[0]
                                  : null
                              )
                            }
                            {...fieldProps}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );

              case "radio":
                return (
                  <FormField
                    control={form.control}
                    name={col.name as string}
                    render={({ field }) => (
                      <FormItem className="mx-2 my-1 space-y-3">
                        <FormLabel>{col.label}</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1">
                            {col.options?.map(
                              (option: any, optionIdx: number) => (
                                <FormItem
                                  key={optionIdx}
                                  className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value={option.value} />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {option.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            )}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );

              default:
                return (
                  <FormField
                    key={idx}
                    control={form.control}
                    name={col.name as string}
                    render={({ field }) => (
                      <FormItem className="mx-2 my-1">
                        <FormLabel>{col.label}</FormLabel>
                        <FormControl>
                          <Input type={col.type} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
            }
          })}
        </div>
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className={clsx("w-full col-span-2 rounded", {
            "bg-blue-700 hover:bg-blue-800": type === "add",
            "bg-yellow-600 hover:bg-yellow-700": type === "edit",
            "bg-green-600 hover:bg-green-700": type === "upload",
            "bg-green-500 hover:bg-green-600": type === "excel",
          })}>
          {type === "add"
            ? "Tambah"
            : type === "edit"
            ? "Edit"
            : type === "upload"
            ? "Upload"
            : "Import"}
        </Button>
      </form>
    </Form>
  );
};
