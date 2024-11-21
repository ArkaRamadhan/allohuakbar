import { useMemo, useState, useEffect } from "react";
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
import { useFormStore } from "../../store/FormStore";
import { UploadFields } from "@/config/FormConfig/upload";
import { useSelectionDeletion } from "../../hooks/useSelectionDeletion";
import ShowDialog from "@/features/MainData/components/Sections/Table/Actions/Columns/ShowDialog";
import AddForm from "@/features/MainData/components/Sections/Table/Actions/Columns/AddForm";
import DeleteDialog from "@/features/MainData/components/Sections/Table/Actions/Columns/DeleteDialog";
import EditForm from "@/features/MainData/components/Sections/Table/Actions/Columns/EditForm";
import UploadForm from "@/features/MainData/components/Sections/Table/Actions/Columns/UploadForm";
import { useToken } from "@/hooks/useToken";
import { extractMiddle } from "@/features/MainData/hooks/useFormat";
import { Excel } from "@/Utils/Excel";
import { useFilterCheckbox } from "@/features/MainData/hooks/useFilterCheckbox";
// SK
import { SkFields } from "@/features/MainData/config/formFields/Dokumen/Sk";

export default function Sk() {
  // TOKEN
  const { userDetails } = useToken();

  // FORM STORE
  const { initialData, setInitialData, setFields } = useFormStore();

  // FETCH & MUTATION HOOKs
  const { data: Sk, isLoading } = useFetchData({
    queryKey: ["sks"],
    axios: {
      url: "/dokumen/sk",
    },
  });
  const PostSk = usePostData({
    axios: {
      url: "/dokumen/sk",
    },
  });
  const DeleteSk = useDeleteData({
    axios: {
      url: "/dokumen/sk",
    },
  });
  const PutSk = usePutData({
    axios: {
      url: "/dokumen/sk",
      id: initialData.ID,
    },
  });

  // COLUMN
  const columns = useMemo(() => {
    const baseColumns = SkFields.map((field) => ({
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
              title={`Form detail data ${initialData?.no_surat}`}
              event={{
                onOpen: () => {
                  setFields([
                    ...SkFields,
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
              title={`Hapus data ${initialData?.no_surat}`}
              event={{
                onOpen: () => setInitialData(data),
                onClose: () => setInitialData({}),
              }}
              form={{
                id: initialData.ID,
                mutation: DeleteSk,
                queryKey: ["sks"],
              }}
            />
            <EditForm
              title={`Form edit data ${initialData?.no_surat}`}
              event={{
                onOpen: () => {
                  setFields(SkFields);
                  setInitialData({
                    ...data,
                    no_surat: extractMiddle(data.no_surat),
                  });
                },
                onClose: () => {
                  setFields([]);
                  setInitialData({});
                },
              }}
              form={{
                mutation: PutSk,
                queryKey: ["sks"],
              }}
            />
            <UploadForm
              title={`Form upload data ${initialData?.no_surat}`}
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
                getUrl: "dokumen/filesSk",
                postUrl: "dokumen/uploadFileSk",
                downloadUrl: "dokumen/downloadSk",
                deleteUrl: "dokumen/deleteSk",
              }}
            />
          </div>
        ),
      },
    ];

    return [...baseColumns, ...actionColumns];
  }, [SkFields, initialData]);

  // DELETE SELECTION
  const { handleSelectedDeletion } = useSelectionDeletion({
    keyField: "ID",
    mutation: DeleteSk,
    queryKey: ["sks"],
  });

  // LEFT SUB HEADER
  const renderSubHeader = (
    <div className="flex gap-2">
      <AddForm
        title={`Form tambah data Sk`}
        form={{
          mutation: PostSk,
          queryKey: ["sks"],
          otherValue: { create_by: userDetails.username },
        }}
        event={{
          onOpen: () => {
            setFields(SkFields);
            setInitialData({});
          },
          onClose: () => {
            setFields([]);
          },
        }}
      />
      <Excel
      link={{
        exportThis: "dokumen/exportSk",
        import: "dokumen/uploadSk",
        exportAll: "dokumen",
      }}
      invalidateKey={["sks"]}
    />
    </div>
  );

  // FILTER NOSURAT
  const { filteredData: filteredData1, renderFilter: renderFilter1 } = useFilter({
    data: Sk,
    filteredItem: "pic",
  });

  const { filteredData: filteredData2, renderFilter: renderFilter2 } =
    useFilterCheckbox({
      data: Sk,
      filter: { "ITS-ISO": true, "ITS-SAG": true },
      filteredItem: "no_surat",
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
    <App services="Sk">
      <div className="p-4">
        {isLoading ? (
          <TableLoading />
        ) : (
          <Table
            title="Sk"
            columns={columns}
            data={finalFilteredData || []}
            CustomHeader={{
              left: renderSubHeader,
              right: (
                <div className="flex gap-4">
                {renderFilter2}
                {renderFilter1}
              </div>),
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
