import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useFormStore } from "@/features/MainData/store/FormStore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface FormConfig {
  onSubmit: (values: any) => void;
}

export const CalendarForm = ({ onSubmit }: FormConfig) => {
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
          className={`grid grid-cols-1 gap-[1rem] max-h-[60vh] overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 mb-4`}>
          {fields.map((col, idx) => {
            switch (col.type) {
              case "radio":
                return (
                  <FormField
                    key={idx}
                    control={form.control}
                    name={col.name as string}
                    render={({ field }) => (
                      <FormItem className="space-y-3 mx-2 my-1">
                        <FormLabel>{col.label}</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex justify-around w-full">
                            {col.options?.map(
                              (option: string, optionIdx: number) => {
                                return (
                                  <FormItem key={optionIdx}>
                                    <FormControl>
                                      <RadioGroupItem
                                        checked={option === field.value}
                                        style={{
                                          backgroundColor: option,
                                          width: "2rem",
                                          height: "2rem",
                                        }}
                                        value={option}
                                      />
                                    </FormControl>
                                  </FormItem>
                                );
                              }
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
          className="w-full col-span-2 roundedti">
          Simpan
        </Button>
      </form>
    </Form>
  );
};
