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
// Arsip
import { ArsipFields } from "@/features/MainData/config/formFields/DataInformasi/Arsip";

export default function Arsip() {
  // TOKEN
  const { userDetails } = useToken();

  // FORM STORE
  const { initialData, setInitialData, setFields } = useFormStore();

  // FETCH & MUTATION HOOKs
  const { data: Arsips, isLoading } = useFetchData({
    queryKey: ["arsips"],
    axios: {
      url: "/informasi/Arsip",
    },
  });
  const PostArsip = usePostData({
    axios: {
      url: "/informasi/Arsip",
    },
  });
  const DeleteArsip = useDeleteData({
    axios: {
      url: "/informasi/Arsip",
    },
  });
  const PutArsip = usePutData({
    axios: {
      url: "/informasi/Arsip",
      id: initialData.ID,
    },
  });

  // COLUMN
  const columns = useMemo(() => {
    const baseColumns = ArsipFields.map((field) => ({
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
              title={`Form detail data ${initialData?.no_arsip}`}
              event={{
                onOpen: () => {
                  setFields([
                    ...ArsipFields,
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
              title={`Hapus data ${initialData?.no_arsip}`}
              event={{
                onOpen: () => setInitialData(data),
                onClose: () => setInitialData({}),
              }}
              form={{
                id: initialData.ID,
                mutation: DeleteArsip,
                queryKey: ["arsips"],
              }}
            />
            <EditForm
              title={`Form edit data ${initialData?.no_arsip}`}
              event={{
                onOpen: () => {
                  setFields(ArsipFields);
                  setInitialData(data);
                },
                onClose: () => {
                  setFields([]);
                  setInitialData({});
                },
              }}
              form={{
                mutation: PutArsip,
                queryKey: ["arsips"],
              }}
            />
            <UploadForm
              title={`Form upload data ${initialData?.no_arsip}`}
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
                getUrl: "/informasi/filesArsip",
                postUrl: "/informasi/uploadFileArsip",
                downloadUrl: "/informasi/downloadArsip",
                deleteUrl: "/informasi/deleteArsip",
              }}
            />
          </div>
        ),
      },
    ];

    return [...baseColumns, ...actionColumns];
  }, [ArsipFields, initialData]);

  // DELETE SELECTION
  const { handleSelectedDeletion } = useSelectionDeletion({
    keyField: "ID",
    mutation: DeleteArsip,
    queryKey: ["arsips"],
  });

  // LEFT SUB HEADER
  const renderSubHeader = (
    <div className="flex gap-2">
      <AddForm
        title={`Form tambah data Arsip`}
        form={{
          mutation: PostArsip,
          queryKey: ["arsips"],
          otherValue: { create_by: userDetails.username },
        }}
        event={{
          onOpen: () => {
            setFields(ArsipFields);
            setInitialData({});
          },
          onClose: () => {
            setFields([]);
          },
        }}
      />
      <Excel
      link={{
          exportThis: "/informasi/exportArsip",
          import: "/informasi/importArsip",
          exportAll: "informasi",
        }}
      invalidateKey={["arsips"]}
      />
    </div>
  );

  // FILTER NOSURAT
  const { filteredData, renderFilter } = useFilter({
    data: Arsips,
    filteredItem: "no_arsip",
  });

  return (
    <App services="Arsip">
      <div className="p-4">
        {isLoading ? (
          <TableLoading />
        ) : (
          <Table
            title="Data Arsip"
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
