import { useMemo, useEffect, useState } from "react";
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
// PROJECT
import { ProjectFields } from "@/features/MainData/config/formFields/RencanaKerja/Project";

export default function Project() {
  // TOKEN
  const { userDetails } = useToken();

  // FORM STORE
  const { initialData, setInitialData, setFields } = useFormStore();

  // FETCH & MUTATION HOOKs
  const { data: Projects, isLoading } = useFetchData({
    queryKey: ["projects"],
    axios: {
      url: "/project/Project",
    },
  });
  const PostProject = usePostData({
    axios: {
      url: "/project/Project",
    },
  });
  const DeleteProject = useDeleteData({
    axios: {
      url: "/project/Project",
    },
  });
  const PutProject = usePutData({
    axios: {
      url: "/project/Project",
      id: initialData.ID,
    },
  });

  // COLUMN
  const NotUsedData = ["group", "infra_type", "budget_type", "type"];

  const columns = useMemo(() => {
    const baseColumns = ProjectFields.filter(
      (field) => !NotUsedData.includes(field.name)
    ).map((field) => ({
      name: field.label,
      selector: (row: any) => FilterTableCell(field, row[field.name]),
      sortable: true,
    }));

    const actionColumns = [
      {
        name: "Kode Project",
        selector: (row: any) => row.kode_project,
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
              title={`Form detail data ${initialData?.kode_project}`}
              event={{
                onOpen: () => {
                  setFields([
                    ...ProjectFields,
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
              title={`Hapus data ${initialData?.kode_project}`}
              event={{
                onOpen: () => setInitialData(data),
                onClose: () => setInitialData({}),
              }}
              form={{
                id: initialData.ID,
                mutation: DeleteProject,
                queryKey: ["projects"],
              }}
            />
            <EditForm
              title={`Form edit data ${initialData?.kode_project}`}
              event={{
                onOpen: () => {
                  setFields(ProjectFields);
                  setInitialData({
                    ...data,
                    kode_project: extractMiddle(data.kode_project),
                  });
                },
                onClose: () => {
                  setFields([]);
                  setInitialData({});
                },
              }}
              form={{
                mutation: PutProject,
                queryKey: ["projects"],
              }}
            />
            <UploadForm
              title={`Form upload data ${initialData?.kode_project}`}
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
                getUrl: "project/filesProject",
                postUrl: "project/uploadFileProject",
                downloadUrl: "project/downloadProject",
                deleteUrl: "project/deleteProject",
              }}
            />
          </div>
        ),
      },
    ];

    return [...actionColumns];
  }, [ProjectFields, initialData]);

  // DELETE SELECTION
  const { handleSelectedDeletion } = useSelectionDeletion({
    keyField: "ID",
    mutation: DeleteProject,
    queryKey: ["projects"],
  });

  // LEFT SUB HEADER
  const renderSubHeader = (
    <div className="flex gap-2">
      <AddForm
        title={`Form tambah data Project`}
        form={{
          mutation: PostProject,
          queryKey: ["projects"],
          otherValue: { create_by: userDetails.username },
        }}
        event={{
          onOpen: () => {
            setFields(ProjectFields);
            setInitialData({});
          },
          onClose: () => {
            setFields([]);
          },
        }}
      />
      <Excel
      link={{
        exportThis: "project/exportProject",
        import: "project/importProject",
        exportAll: "project",
      }}
      invalidateKey={["projects"]}
      />
    </div>
  );

  // FILTER NOSURAT
  const { filteredData: filteredData1, renderFilter: renderFilter1 } = useFilter({
    data: Projects,
    filteredItem: "pic",
  });

  const { filteredData: filteredData2, renderFilter: renderFilter2 } =
    useFilterCheckbox({
      data: Projects,
      filter: { "ITS-ISO": true, "ITS-SAG": true },
      filteredItem: "kode_project",
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
    <App services="Project">
      <div className="p-4">
        {isLoading ? (
          <TableLoading />
        ) : (
          <Table
            title="Project"
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
