import { useMemo} from "react";
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
// PERJALANAN DINAS
import { PerdinFields } from "@/features/MainData/config/formFields/Dokumen/Perdin";

export default function Perdin() {
  // TOKEN
  const { userDetails } = useToken();

  // FORM STORE
  const { initialData, setInitialData, setFields } = useFormStore();

  // FETCH & MUTATION HOOKs
  const { data: Perdins, isLoading } = useFetchData({
    queryKey: ["perdins"],
    axios: {
      url: "/dokumen/Perdin",
    },
  });
  const PostPerdin = usePostData({
    axios: {
      url: "/dokumen/Perdin",
    },
  });
  const DeletePerdin = useDeleteData({
    axios: {
      url: "/dokumen/Perdin",
    },
  });
  const PutPerdin = usePutData({
    axios: {
      url: "/dokumen/Perdin",
      id: initialData.ID,
    },
  });

  // COLUMN
  const columns = useMemo(() => {
    const baseColumns = PerdinFields.map((field) => ({
      name: field.label,
      selector: (row: any) => FilterTableCell(field, row[field.name]),
      sortable: true,
    }));

    const actionColumns = [
      {
        name: "Nomer Perdin",
        selector: (row: any) => row.no_perdin,
        sortable: true,
      },
      ...baseColumns,
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
              title={`Form detail data ${initialData?.no_perdin}`}
              event={{
                onOpen: () => {
                  setFields([
                    ...PerdinFields,
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
              title={`Hapus data ${initialData?.no_perdin}`}
              event={{
                onOpen: () => setInitialData(data),
                onClose: () => setInitialData({}),
              }}
              form={{
                id: initialData.ID,
                mutation: DeletePerdin,
                queryKey: ["perdins"],
              }}
            />
            <EditForm
              title={`Form edit data ${initialData?.no_perdin}`}
              event={{
                onOpen: () => {
                  setFields(PerdinFields);
                  setInitialData({
                    ...data,
                    no_perdin: extractMiddle(data.no_perdin),
                  });
                },
                onClose: () => {
                  setFields([]);
                  setInitialData({});
                },
              }}
              form={{
                mutation: PutPerdin,
                queryKey: ["perdins"],
              }}
            />
            <UploadForm
              title={`Form upload data ${initialData?.no_perdin}`}
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
                getUrl: "dokumen/filesPerdin",
                postUrl: "dokumen/uploadFilePerdin",
                downloadUrl: "dokumen/downloadPerdin",
                deleteUrl: "dokumen/deletePerdin",
              }}
            />
          </div>
        ),
      },
    ];

    return [...actionColumns];
  }, [PerdinFields, initialData]);

  // DELETE SELECTION
  const { handleSelectedDeletion } = useSelectionDeletion({
    keyField: "ID",
    mutation: DeletePerdin,
    queryKey: ["perdins"],
  });

  // LEFT SUB HEADER
  const renderSubHeader = (
    <div className="flex gap-2">
      <AddForm
        title={`Form tambah data Perdin`}
        form={{
          mutation: PostPerdin,
          queryKey: ["perdins"],
          otherValue: { create_by: userDetails.username },
        }}
        event={{
          onOpen: () => {
            setFields(PerdinFields);
            setInitialData({});
          },
          onClose: () => {
            setFields([]);
          },
        }}
      />
      <Excel
        link={{
          exportThis: "dokumen/exportPerdin",
          import: "dokumen/uploadPerdin",
          exportAll: "dokumen",
        }}
        invalidateKey={["perdins"]}
      />
    </div>
  );

  // FILTER NO PERDIN
  const { filteredData, renderFilter } = useFilter({
    data: Perdins,
    filteredItem: "hotel",
  });

  return (
    <App services="Perdin">
      <div className="p-4">
        {isLoading ? (
          <TableLoading />
        ) : (
          <Table
            title="Perdin"
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
