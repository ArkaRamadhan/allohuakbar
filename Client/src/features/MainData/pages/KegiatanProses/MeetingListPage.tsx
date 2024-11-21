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
// MEETINGSCHEDULE
import { MeetingScheduleFields } from "@/features/MainData/config/formFields/KegiatanProses/MeetingList";

export default function MeetingSchedule() {
  // TOKEN
  const { userDetails } = useToken();

  // FORM STORE
  const { initialData, setInitialData, setFields } = useFormStore();

  // FETCH & MUTATION HOOKs
  const { data: Schedule, isLoading } = useFetchData({
    queryKey: ["shcedules"],
    axios: {
      url: "/weeklytimeline/meetingSchedule",
    },
  });
  const PostShcedule = usePostData({
    axios: {
      url: "/weeklytimeline/meetingSchedule",
    },
  });
  const DeleteShcedule = useDeleteData({
    axios: {
      url: "/weeklytimeline/meetingSchedule",
    },
  });
  const PutShcedule = usePutData({
    axios: {
      url: "/weeklytimeline/meetingSchedule",
      id: initialData.ID,
    },
  });

  // COLUMN
  const columns = useMemo(() => {
    const baseColumns = MeetingScheduleFields.filter(
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
                    ...MeetingScheduleFields,
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
                mutation: DeleteShcedule,
                queryKey: ["shcedules"],
              }}
            />
            <EditForm
              title={`Form edit data ${initialData?.ID}`}
              event={{
                onOpen: () => {
                  setFields(MeetingScheduleFields);
                  setInitialData(data);
                },
                onClose: () => {
                  setFields([]);
                  setInitialData({});
                },
              }}
              form={{
                mutation: PutShcedule,
                queryKey: ["shcedules"],
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
                getUrl: "weeklytimeline/filesMeetingList",
                postUrl: "weeklytimeline/uploadFileMeetingList",
                downloadUrl: "weeklytimeline/downloadMeetingList",
                deleteUrl: "weeklytimeline/deleteMeetingList",
              }}
            />
          </div>
        ),
      },
    ];

    return [...baseColumns, ...actionColumns];
  }, [MeetingScheduleFields, initialData]);

  // DELETE SELECTION
  const { handleSelectedDeletion } = useSelectionDeletion({
    keyField: "ID",
    mutation: DeleteShcedule,
    queryKey: ["shcedules"],
  });

  // LEFT SUB HEADER
  const renderSubHeader = (
    <div className="flex gap-2">
      <AddForm
        title={`Form tambah data Meeting Shcedule`}
        form={{
          mutation: PostShcedule,
          queryKey: ["shcedules"],
          otherValue: { create_by: userDetails.username },
        }}
        event={{
          onOpen: () => {
            setFields(MeetingScheduleFields);
            setInitialData({});
          },
          onClose: () => {
            setFields([]);
          },
        }}
      />
      <Excel
        link={{
          exportAll: "weeklytimeline",
          exportThis: "weeklytimeline/exportMeetingList",
          import: "weeklytimeline/importMeetingList",
        }}
        invalidateKey={["shcedules"]}
      />
    </div>
  );

  // FILTER NOMEMO
  const { filteredData, renderFilter } = useFilter({
    data: Schedule,
    filteredItem: "pic",
  });

  return (
    <App services="Meeting Shcedule">
      <div className="p-4">
        {isLoading ? (
          <TableLoading />
        ) : (
          <Table
            title="Meeting Shcedule"
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
