import { useCallback, useMemo, useState } from "react";
import { SelectFilter } from "../components/Sections/Table/SelectFilter";

interface Props {
  data: any;
  filter: Record<string, boolean>;
  filteredItem: string;
}

export const useFilterCheckbox = ({ data, filter, filteredItem }: Props) => {
  // FILTER KATEGORI
  const [filterCategory, setFilter] = useState(filter);

  const filteredData = useMemo(() => {
    const activeFilters = Object.keys(filterCategory).filter(
      (key) => filterCategory[key]
    );

    return data?.filter((item: any) =>
      activeFilters?.some((filter) =>
        item[filteredItem]
          ?.toString()
          .toLowerCase()
          .includes(filter.toLowerCase())
      )
    );
  }, [data, filterCategory]);

  // HANDLE FILTER KATEGORI
  const handleCheckboxChange = useCallback(
    (category: any) => {
      setFilter((prevFilter) => ({
        ...prevFilter,
        [category]: !(prevFilter as any)[category],
      }));
    },
    [filterCategory]
  );

  const renderFilter = useMemo(() => {
    return (
      <SelectFilter
        options={Object.keys(filterCategory)}
        filter={filterCategory}
        onFilter={handleCheckboxChange}
      />
    );
  }, [filter]);

  return { filteredData, renderFilter };
};
