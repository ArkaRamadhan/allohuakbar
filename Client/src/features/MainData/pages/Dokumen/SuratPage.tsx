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
// SURAT
import { SuratFields } from "@/features/MainData/config/formFields/Dokumen/Surat";

export default function Surat() {
  // TOKEN
  const { userDetails } = useToken();

  // FORM STORE
  const { initialData, setInitialData, setFields } = useFormStore();

  // FETCH & MUTATION HOOKs
  const { data: Surats, isLoading } = useFetchData({
    queryKey: ["surats"],
    axios: {
      url: "/dokumen/surat",
    },
  });
  const PostSurat = usePostData({
    axios: {
      url: "/dokumen/surat",
    },
  });
  const DeleteSurat = useDeleteData({
    axios: {
      url: "/dokumen/surat",
    },
  });
  const PutSurat = usePutData({
    axios: {
      url: "/dokumen/surat",
      id: initialData.ID,
    },
  });

  // COLUMN
  const columns = useMemo(() => {
    const baseColumns = SuratFields.map((field) => ({
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
                    ...SuratFields,
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
                mutation: DeleteSurat,
                queryKey: ["surats"],
              }}
            />
            <EditForm
              title={`Form edit data ${initialData?.no_surat}`}
              event={{
                onOpen: () => {
                  setFields(SuratFields);
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
                mutation: PutSurat,
                queryKey: ["surats"],
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
                getUrl: "dokumen/filesSurat",
                postUrl: "dokumen/uploadFileSurat",
                downloadUrl: "dokumen/downloadSurat",
                deleteUrl: "dokumen/deleteSurat",
              }}
            />
          </div>
        ),
      },
    ];

    return [...baseColumns, ...actionColumns];
  }, [SuratFields, initialData]);

  // DELETE SELECTION
  const { handleSelectedDeletion } = useSelectionDeletion({
    keyField: "ID",
    mutation: DeleteSurat,
    queryKey: ["surats"],
  });

  // LEFT SUB HEADER
  const renderSubHeader = (
    <div className="flex gap-2">
      <AddForm
        title={`Form tambah data Surat`}
        form={{
          mutation: PostSurat,
          queryKey: ["surats"],
          otherValue: { create_by: userDetails.username },
        }}
        event={{
          onOpen: () => {
            setFields(SuratFields);
            setInitialData({});
          },
          onClose: () => {
            setFields([]);
          },
        }}
      />
      <Excel
        link={{
          exportThis: "exportSurat",
          import: "importSurat",
          exportAll: "dokumen",
        }}
        invalidateKey={["surats"]}
      />
    </div>
  );

  // FILTER NOSURAT
  const { filteredData: filteredData1, renderFilter: renderFilter1 } =
    useFilter({
      data: Surats,
      filteredItem: "pic",
    });

  const { filteredData: filteredData2, renderFilter: renderFilter2 } =
    useFilterCheckbox({
      data: Surats,
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
    <App services="Surat">
      <div className="p-4">
        {isLoading ? (
          <TableLoading />
        ) : (
          <Table
            title="Data Surat"
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
