import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Button } from "@/components/ui/button";

interface RowProps {
  title: string;
  variant:
    | "default"
    | "destructive"
    | "ghost"
    | "link"
    | "outline"
    | "secondary";
  action: (selectedRows: any[]) => void;
}

interface CustomHeader {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

interface TableProps {
  title: string | undefined;
  columns: any[];
  data: any[];
  CustomHeader?: CustomHeader;
  SelectedRows: RowProps;
  className?: string;
}

export default function Table({
  title,
  columns,
  data = [],
  CustomHeader,
  SelectedRows,
  className,
}: TableProps) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const handleSelect = ({ selectedRows }: any) => {
    setSelectedRows(selectedRows);
  };

  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
    setSelectedRows([]);
  };

  const handleTriggerSelectedRows = () => {
    SelectedRows.action(selectedRows);
    setToggleClearRows(!toggledClearRows);
    setSelectedRows([]);
  };

  return (
    <DataTable
      className={`h-[50vh] overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 ${className}`}
      title={`Tabel ${title}`}
      columns={columns}
      data={data}
      onSelectedRowsChange={handleSelect}
      clearSelectedRows={toggledClearRows}
      selectableRows
      pagination
      highlightOnHover
      striped
      responsive
      fixedHeader
      subHeader
      subHeaderComponent={
        <div className="w-full flex justify-between">
          <div className="flex gap-1.5 justify-center items-center">
            {CustomHeader?.left}
            <div className="flex gap-2">
              <Button
                className="w-max rounded"
                variant={SelectedRows.variant}
                onClick={handleTriggerSelectedRows}
                disabled={selectedRows.length === 0}>
                {SelectedRows.title}
              </Button>
              {selectedRows.length > 0 && (
                <Button
                  className="w-max"
                  variant={"secondary"}
                  onClick={handleClearRows}>
                  Batal
                </Button>
              )}
            </div>
          </div>
          <div className="flex gap-1.5 justify-center items-center">
            {CustomHeader?.right}
          </div>
        </div>
      }
    />
  );
}
