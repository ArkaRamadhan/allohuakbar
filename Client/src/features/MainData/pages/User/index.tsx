import { useEffect, useMemo } from "react";
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
import AddForm from "../../components/Sections/Table/Actions/Columns/AddForm";
import EditForm from "@/features/MainData/components/Sections/Table/Actions/Columns/EditForm";
import DeleteDialog from "@/features/MainData/components/Sections/Table/Actions/Columns/DeleteDialog";
// USER
import { UserFields } from "@/features/MainData/config/formFields/User";
import { useSelectionDeletion } from "../../hooks/useSelectionDeletion";
import { useToken } from "@/hooks/useToken";
import NotFound from "@/pages/Error/404";

export default function User() {
  const {
    userDetails: { role },
  } = useToken();

  // FORM STORE
  const { initialData, setInitialData, setFields } = useFormStore();

  // SETFIELDS
  useEffect(() => {
    setFields(UserFields);
  }, []);

  // FETCH & MUTATION HOOKs
  const { data: users, isLoading } = useFetchData({
    queryKey: initialData.ID ? ["users", initialData?.ID] : ["users"],
    axios: {
      url: "/user/user",
    },
    // AUTHORIZATION
    enabled: role === "admin",
  });
  const PostUser = usePostData({
    axios: {
      url: "/user/user",
    },
  });
  const DeleteUser = useDeleteData({
    axios: {
      url: `/user/user`,
    },
  });
  const PutUser = usePutData({
    axios: {
      url: `/user/user`,
      id: initialData.ID,
    },
  });

  // COLUMN
  const columns = useMemo(() => {
    const MainColumn = UserFields.map((field) => ({
      name: field.label,
      selector: (row: any) => FilterTableCell(field, row[field.name]),
      sortable: true,
    }));

    const ActionColumn = [
      {
        name: "Action",
        cell: (data: any) => (
          <div className="flex gap-1">
            <DeleteDialog
              title={`Hapus data ${initialData?.Username}`}
              event={{
                onOpen: () => setInitialData(data),
                onClose: () => setInitialData({}),
              }}
              form={{
                id: initialData.ID,
                mutation: DeleteUser,
                queryKey: ["users", initialData.ID] as string[],
              }}
            />
            <EditForm
              title={`Form edit data ${initialData?.Username}`}
              event={{
                onOpen: () => setInitialData(data),
                onClose: () => setInitialData({}),
              }}
              form={{
                mutation: PutUser,
                queryKey: ["users", initialData.ID] as string[],
              }}
            />
          </div>
        ),
      },
    ];

    return [...MainColumn, ...ActionColumn];
  }, [UserFields, initialData]);

  // DELETE SELECTION
  const { handleSelectedDeletion } = useSelectionDeletion({
    keyField: "ID",
    mutation: DeleteUser,
    queryKey: ["users"],
  });

  // LEFT SUB HEADER
  const renderSubHeader = useMemo(() => {
    return (
      <div className="flex gap-2">
        <AddForm
          title={`Form tambah data User`}
          form={{
            mutation: PostUser,
            queryKey: ["users"],
          }}
        />
      </div>
    );
  }, []);

  // FILTER USERNAME
  const { filteredData, renderFilter } = useFilter({
    data: users,
    filteredItem: "Username",
  });

  // AUTHORIZATION
  if (role === "Admin") {
    return <NotFound />;
  } else {
    return (
      <App services="Users">
        <div className="p-4">
          {isLoading ? (
            <TableLoading />
          ) : (
            <Table
              title="Users"
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
}
