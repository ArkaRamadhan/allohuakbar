import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Props = {
  options: any;
  filter: Record<string, boolean>;
  onFilter: (e: any) => void;
};

export const SelectFilter = ({ options = [], filter, onFilter }: Props) => {
  return (
    <div className="flex justify-center items-center gap-[1rem]">
      {options?.map((option: string) => (
        <div key={option} className="flex gap-1">
          <Checkbox
            checked={filter[option]}
            onCheckedChange={() => onFilter(option)}
          />
          <Label>{option}</Label>
        </div>
      ))}
    </div>
  );
};
