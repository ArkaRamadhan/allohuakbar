import { useMemo } from "react";
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
import { Excel } from "@/Utils/Excel";
// SURAT MASUK
import { SuratMasukFields } from "@/features/MainData/config/formFields/DataInformasi/SuratMasuk";

export default function SuratMasuk() {
  // TOKEN
  const { userDetails } = useToken();

  // FORM STORE
  const { initialData, setInitialData, setFields } = useFormStore();

  // FETCH & MUTATION HOOKs
  const { data: SuratMasuks, isLoading } = useFetchData({
    queryKey: ["suratMasuks"],
    axios: {
      url: "/informasi/SuratMasuk",
    },
  });
  const PostSuratMasuk = usePostData({
    axios: {
      url: "/informasi/SuratMasuk",
    },
  });
  const DeleteSuratMasuk = useDeleteData({
    axios: {
      url: "/informasi/SuratMasuk",
    },
  });
  const PutSuratMasuk = usePutData({
    axios: {
      url: "/informasi/SuratMasuk",
      id: initialData.ID,
    },
  });

  // COLUMN
  const columns = useMemo(() => {
    const baseColumns = SuratMasukFields.map((field) => ({
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
                    ...SuratMasukFields,
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
                mutation: DeleteSuratMasuk,
                queryKey: ["suratMasuks"],
              }}
            />
            <EditForm
              title={`Form edit data ${initialData?.no_surat}`}
              event={{
                onOpen: () => {
                  setFields(SuratMasukFields);
                  setInitialData(data);
                },
                onClose: () => {
                  setFields([]);
                  setInitialData({});
                },
              }}
              form={{
                mutation: PutSuratMasuk,
                queryKey: ["suratMasuks"],
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
                getUrl: "/informasi/filesSuratMasuk",
                postUrl: "/informasi/uploadFileSuratMasuk",
                downloadUrl: "/informasi/downloadSuratMasuk",
                deleteUrl: "/informasi/deleteSuratMasuk",
              }}
            />
          </div>
        ),
      },
    ];

    return [...baseColumns, ...actionColumns];
  }, [SuratMasukFields, initialData]);

  // DELETE SELECTION
  const { handleSelectedDeletion } = useSelectionDeletion({
    keyField: "ID",
    mutation: DeleteSuratMasuk,
    queryKey: ["suratMasuks"],
  });

  // LEFT SUB HEADER
  const renderSubHeader = (
    <div className="flex gap-2">
      <AddForm
        title={`Form tambah data Surat Masuk`}
        form={{
          mutation: PostSuratMasuk,
          queryKey: ["suratMasuks"],
          otherValue: { create_by: userDetails.username },
        }}
        event={{
          onOpen: () => {
            setFields(SuratMasukFields);
            setInitialData({});
          },
          onClose: () => {
            setFields([]);
          },
        }}
      />
      <Excel
        link={{
          exportThis: "/informasi/exportSuratMasuk",
          import: "/informasi/uploadSuratMasuk",
          exportAll: "informasi",
        }}
        invalidateKey={["suratMasuks"]}
      />
    </div>
  );

  // FILTER NOSURAT
  const { filteredData, renderFilter } = useFilter({
    data: SuratMasuks,
    filteredItem: "title",
  });

  return (
    <App services="Surat Masuk">
      <div className="p-4">
        {isLoading ? (
          <TableLoading />
        ) : (
          <Table
            title="Data Surat Masuk"
            columns={columns}
            data={filteredData || []}
            CustomHeader={{
              left: renderSubHeader,
              right: renderFilter,
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
