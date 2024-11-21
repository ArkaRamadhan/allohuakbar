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
import statusCell from "@/features/MainData/lib/statusCell";
import { Excel } from "@/Utils/Excel";
// MEETING
import { MeetingFields } from "@/features/MainData/config/formFields/KegiatanProses/Meeting";

export default function MeetingSchedule() {
  // TOKEN
  const { userDetails } = useToken();

  // FORM STORE
  const { initialData, setInitialData, setFields } = useFormStore();

  // FETCH & MUTATION HOOKs
  const { data: Meeting, isLoading } = useFetchData({
    queryKey: ["meetings"],
    axios: {
      url: "/kegiatan/meetings",
    },
  });
  const PostMeeting = usePostData({
    axios: {
      url: "/kegiatan/meetings",
    },
  });
  const DeleteMeeting = useDeleteData({
    axios: {
      url: "/kegiatan/meetings",
    },
  });
  const PutMeeting = usePutData({
    axios: {
      url: "/kegiatan/meetings",
      id: initialData.ID,
    },
  });

  // COLUMN
  const columns = useMemo(() => {
    const baseColumns = MeetingFields.filter(
      (field) => field.name !== "status"
    ).map((field) => ({
      name: field.label,
      selector: (row: any) => FilterTableCell(field, row[field.name]),
      sortable: true,
    }));

    const actionColumns = [
      {
        name: "Status",
        selector: (row: any) => row.status,
        conditionalCellStyles: statusCell(),
      },
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
              title={`Form detail data ${initialData.ID}`}
              event={{
                onOpen: () => {
                  setFields([
                    ...MeetingFields,
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
              title={`Hapus data ${initialData.ID}`}
              event={{
                onOpen: () => setInitialData(data),
                onClose: () => setInitialData({}),
              }}
              form={{
                id: initialData.ID,
                mutation: DeleteMeeting,
                queryKey: ["meetings"],
              }}
            />
            <EditForm
              title={`Form edit data ${initialData?.ID}`}
              event={{
                onOpen: () => {
                  setFields(MeetingFields);
                  setInitialData(data);
                },
                onClose: () => {
                  setFields([]);
                  setInitialData({});
                },
              }}
              form={{
                mutation: PutMeeting,
                queryKey: ["meetings"],
              }}
            />
            <UploadForm
              title={`Form upload data ${initialData?.ID}`}
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
                getUrl: "kegiatan/filesMeeting",
                postUrl: "kegiatan/uploadFileMeeting",
                downloadUrl: "kegiatan/downloadMeeting",
                deleteUrl: "kegiatan/deleteMeeting",
              }}
            />
          </div>
        ),
      },
    ];

    return [...baseColumns, ...actionColumns];
  }, [MeetingFields, initialData]);

  // DELETE SELECTION
  const { handleSelectedDeletion } = useSelectionDeletion({
    keyField: "ID",
    mutation: DeleteMeeting,
    queryKey: ["meetings"],
  });

  // LEFT SUB HEADER
  const renderSubHeader = (
    <div className="flex gap-2">
      <AddForm
        title={`Form tambah data Meeting`}
        form={{
          mutation: PostMeeting,
          queryKey: ["meetings"],
          otherValue: { create_by: userDetails.username },
        }}
        event={{
          onOpen: () => {
            setFields(MeetingFields);
            setInitialData({});
          },
          onClose: () => {
            setFields([]);
          },
        }}
      />
      <Excel
      link={{
        exportThis: "kegiatan/exportMeeting",
        import: "kegiatan/uploadMeeting",
        exportAll: "kegiatan",
      }}
      invalidateKey={["meetings"]}
      />
    </div>
  );

  // FILTER NOMEMO
  const { filteredData, renderFilter } = useFilter({
    data: Meeting,
    filteredItem: "pic",
  });

  return (
    <App services="Meeting">
      <div className="p-4">
        {isLoading ? (
          <TableLoading />
        ) : (
          <Table
            title="Meeting"
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
