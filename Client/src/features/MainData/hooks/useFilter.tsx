import React from "react";
import { FilterComponent } from "@/features/MainData/components/Sections/Table/TextFilter";

interface Props {
  data: any;
  filteredItem: string;
}

export const useFilter = ({ data, filteredItem }: Props) => {
  const [filterText, setFilterText] = React.useState("");

  let filteredData;

  if (filteredData !== "") {
    filteredData = React.useMemo(() => {
      return data?.filter((item: any) => {
        return item[filteredItem]
          .toLowerCase()
          .includes(filterText.toLowerCase());
      });
    }, [data, filterText]);
  } else {
    filteredData = data;
  }

  const handleClear = () => {
    if (filterText) {
      setFilterText("");
    }
  };

  const renderFilter = React.useMemo(() => {
    return (
      <FilterComponent
        filteredData={filteredItem}
        onFilter={(e: any) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText]);

  return { filteredData, renderFilter };
};
