import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  filteredData: string;
  onFilter: (e: any) => void;
  filterText: string;
  onClear: () => void;
};

export const FilterComponent = ({
  filteredData,
  onFilter,
  filterText,
  onClear,
}: Props) => {
  return (
    <div className="flex justify-center items-center gap-[.5rem]">
      <Input
        id="search"
        type="text"
        placeholder={`Filter ${filteredData ? filteredData : "Data"}...`}
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
        className="rounded"
      />
      <Button
        className="bg-blue-700 hover:bg-blue-800 rounded"
        type="button"
        onClick={onClear}>
        X
      </Button>
    </div>
  );
};
