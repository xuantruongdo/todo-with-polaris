import {
  Card,
  Checkbox,
  EmptyState,
  Page,
  ResourceList,
  TextField,
} from "@shopify/polaris";
import "./list.css";
import { useCallback, useState } from "react";
import Todo from "../Todo/Todo";
import {
  callAdd,
  callDelete,
  callGetAll,
  callMultipleDelete,
  callMultipleUpdate,
  callUpdate,
} from "../../api/api";
import useFetchData from "../../hooks/useFetchApi";
import useModal from "../../hooks/useModal";

const List = () => {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);

  const [value, setValue] = useState("");

  const handleChangeInput = useCallback((newValue) => setValue(newValue), []);

  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);

  const [selectedItems, setSelectedItems] = useState([]);

  const { data: todos, loading, fetchData } = useFetchData(callGetAll);

  const resourceName = {
    singular: "todo",
    plural: "todos",
  };

  const items = [];
  const appliedFilters = [];

  const emptyStateMarkup =
    !appliedFilters.length && !items.length ? (
      <EmptyState
        heading="Upload a file to get started"
        action={{ content: "Upload files" }}
        image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
      >
        <p>
          You can use the Files section to upload images, videos, and other
          documents
        </p>
      </EmptyState>
    ) : undefined;

  const handleAdd = async () => {
    if (value.trim() === "") {
      setError(true);
      return;
    }
    const res = await callAdd({ text: value });
    if (res && res.data) {
      setValue("");
      setError(false);
      closeModal();
      setTimeout(() => {
        fetchData(callGetAll);
      }, 200);
    }
  };

  const handleComplete = async (id, isCompleted) => {
    const res = await callUpdate(id, { isCompleted: !isCompleted });
    if (res && res.data) {
      setSelectedItems([]);
      fetchData(callGetAll);
    }
  };

  const handleDelete = async (id) => {
    const res = await callDelete(id);
    if (res && res.data) {
      setSelectedItems([]);
      setTimeout(() => {
        fetchData(callGetAll);
      }, 100);
    }
  };

  const deleteMultiple = async () => {
    const res = await callMultipleDelete({ ids: selectedItems });
    if (res && res.data) {
      setSelectedItems([]);
      setTimeout(() => {
        fetchData(callGetAll);
      }, 150);
    }
  };

  const completeMultiple = async () => {
    const res = await callMultipleUpdate({ ids: selectedItems });
    if (res && res.data) {
      fetchData(callGetAll);
      setSelectedItems([]);
    }
  };

  const promotedBulkActions = [
    {
      content: "Complete",
      onAction: completeMultiple,
    },
    {
      content: "Delete",
      destructive: true,
      onAction: deleteMultiple,
    },
  ];

  const { modal, closeModal, openModal } = useModal({
    title: "Create a todo",
    confirmAction: handleAdd,
    content: (
      <TextField
        error={error ? "Please enter a valid value" : undefined}
        value={value}
        onChange={handleChangeInput}
        autoComplete="off"
      />
    ),
  });

  return (
    <Page
      title="Todos"
      primaryAction={{
        content: "Create todo",
        primary: true,
        onAction: openModal,
      }}
    >
      <div className="select-wrapper">
        <p>Showing {todos.length} todos</p>
        <div className="select-div">
          <Checkbox label="Select" checked={checked} onChange={handleChange} />
        </div>
      </div>
      <Card>
        <ResourceList
          resourceName={resourceName}
          emptyState={emptyStateMarkup}
          promotedBulkActions={promotedBulkActions}
          items={todos}
          renderItem={(todo) => (
            <Todo
              key={todo.id}
              item={todo}
              handleComplete={handleComplete}
              handleDelete={handleDelete}
            />
          )}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          selectable
        />

        {loading ? <p>Loading...</p> : ""}
      </Card>
      {modal}
    </Page>
  );
};

export default List;
