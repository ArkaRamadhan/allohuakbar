import { useEffect, useMemo, useState } from "react";
import App from "@/components/Layouts/App";
import Table from "@/features/MainData/components/Sections/Table/DynamicTable";
import FilterTableCell from "@/lib/FilterTableCell";
import { TableLoading } from "@/features/MainData/components/Elements/Loading/TableLoading";
import { useFilter } from "@/features/MainData/hooks/useFilter";
import {
  useFetchData,
  useDeleteData,
  usePutData,
  usePostData,
} from "@/features/MainData/hooks/useAPI";
import { useFormStore } from "@/features/MainData/store/FormStore";
import { UploadFields } from "@/config/FormConfig/upload";
import { useSelectionDeletion } from "@/features/MainData/hooks/useSelectionDeletion";
import ShowDialog from "@/features/MainData/components/Sections/Table/Actions/Columns/ShowDialog";
import AddForm from "@/features/MainData/components/Sections/Table/Actions/Columns/AddForm";
import DeleteDialog from "@/features/MainData/components/Sections/Table/Actions/Columns/DeleteDialog";
import EditForm from "@/features/MainData/components/Sections/Table/Actions/Columns/EditForm";
import UploadForm from "@/features/MainData/components/Sections/Table/Actions/Columns/UploadForm";
import { useToken } from "@/hooks/useToken";
import { extractMiddle } from "@/features/MainData/hooks/useFormat";
import { Excel } from "@/Utils/Excel";
import { useFilterCheckbox } from "@/features/MainData/hooks/useFilterCheckbox";
// MEMO
import { MemoFields } from "@/features/MainData/config/formFields/Dokumen/Memo";

export default function Memo() {
  // TOKEN
  const { userDetails } = useToken();

  // FORM STORE
  const { initialData, setInitialData, setFields } = useFormStore();

  // FETCH & MUTATION HOOKs
  const { data: memos, isLoading } = useFetchData({
    queryKey: ["memos"],
    axios: {
      url: "/dokumen/memo",
    },
  });
  const PostMemo = usePostData({
    axios: {
      url: "/dokumen/memo",
    },
  });
  const DeleteMemo = useDeleteData({
    axios: {
      url: "/dokumen/memo",
    },
  });
  const PutMemo = usePutData({
    axios: {
      url: "/dokumen/memo",
      id: initialData.ID,
    },
  });

  // COLUMN
  const columns = useMemo(() => {
    const baseColumns = MemoFields.map((field) => ({
      name: field.label,
      selector: (row: any) => FilterTableCell(field, row[field.name]),
      sortable: true,
    }));

    const actionColumns = [
      {
        name: "Action By",
        selector: (row: any) => row.create_by,
        sortable: true,
      },
      {
        name: "Action",
        cell: (data: any) => (
          <div className="flex gap-1">
            <ShowDialog
              title={`Form detail data ${initialData?.no_memo}`}
              event={{
                onOpen: () => {
                  setFields([
                    ...MemoFields,
                    { name: "create_by", label: "Action By" },
                  ]);
                  setInitialData(data);
                },
                onClose: () => {
                  setFields([]);
                  setInitialData({});
                },
              }}
            />
            <DeleteDialog
              title={`Hapus data ${initialData?.no_memo}`}
              event={{
                onOpen: () => setInitialData(data),
                onClose: () => setInitialData({}),
              }}
              form={{
                id: initialData.ID,
                mutation: DeleteMemo,
                queryKey: ["memos"],
              }}
            />
            <EditForm
              title={`Form edit data ${initialData?.no_memo}`}
              event={{
                onOpen: () => {
                  setFields(MemoFields);
                  setInitialData({
                    ...data,
                    no_memo: extractMiddle(data.no_memo),
                  });
                },
                onClose: () => {
                  setFields([]);
                  setInitialData({});
                },
              }}
              form={{
                mutation: PutMemo,
                queryKey: ["memos"],
              }}
            />
            <UploadForm
              title={`Form upload data ${initialData?.no_memo}`}
              event={{
                onOpen: () => {
                  setFields(UploadFields);
                  setInitialData(data);
                },
                onClose: () => {
                  setFields([]);
                  setInitialData({});
                },
              }}
              url={{
                getUrl: "dokumen/filesMemo",
                postUrl: "dokumen/uploadFileMemo",
                downloadUrl: "dokumen/downloadMemo",
                deleteUrl: "dokumen/deleteMemo",
              }}
            />
          </div>
        ),
      },
    ];

    return [...baseColumns, ...actionColumns];
  }, [MemoFields, initialData]);

  // DELETE SELECTION
  const { handleSelectedDeletion } = useSelectionDeletion({
    keyField: "ID",
    mutation: DeleteMemo,
    queryKey: ["memos"],
  });

  // LEFT SUB HEADER
  const renderSubHeader = (
    <div className="flex gap-2">
      <AddForm
        title={`Form tambah data Memo`}
        form={{
          mutation: PostMemo,
          queryKey: ["memos"],
          otherValue: { create_by: userDetails.username },
        }}
        event={{
          onOpen: () => {
            setFields(MemoFields);
            setInitialData({});
          },
          onClose: () => {
            setFields([]);
          },
        }}
      />
      <Excel
        link={{
          exportThis: "dokumen/exportMemo",
          import: "dokumen/uploadMemo",
          exportAll: "dokumen",
        }}
        invalidateKey={["memos"]}
      />
    </div>
  );

  // FILTER NOMEMO
  const { filteredData: filteredData1, renderFilter: renderFilter1 } =
    useFilter({
      data: memos,
      filteredItem: "pic",
    });

  //TODO: IMPLEMENTASI FILTER SAGISO
  const { filteredData: filteredData2, renderFilter: renderFilter2 } =
    useFilterCheckbox({
      data: memos,
      filter: { "ITS-ISO": true, "ITS-SAG": true },
      filteredItem: "no_memo",
    });

  // State untuk menyimpan hasil gabungan
  const [finalFilteredData, setFinalFilteredData] = useState([]);

  // Sinkronisasi hasil filter
  useEffect(() => {
    const intersectedData = filteredData1?.filter((item: any) =>
      filteredData2.includes(item)
    );
    setFinalFilteredData(intersectedData);
  }, [filteredData1, filteredData2]);

  return (
    <App services="Memo">
      <div className="p-4">
        {isLoading ? (
          <TableLoading />
        ) : (
          <Table
            title="Memo"
            columns={columns}
            data={finalFilteredData || []}
            CustomHeader={{
              left: renderSubHeader,
              right: (
                <div className="flex gap-4">
                  {renderFilter2}
                  {renderFilter1}
                </div>
              ),
            }}
            SelectedRows={{
              title: "Hapus",
              variant: "destructive",
              action: handleSelectedDeletion,
            }}
          />
        )}
      </div>
    </App>
  );
}
