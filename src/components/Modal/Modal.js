import { Modal, TextField } from "@shopify/polaris";
import { useCallback, useState } from "react";

const ModalCreate = ({ handleAdd, error, isModalOpen, openModal, closeModal }) => {
  const [value, setValue] = useState("");
  const handleChange = useCallback((newValue) => setValue(newValue), []);
  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      title="Create a new todo"
      primaryAction={{
        content: "Create",
        primary: true,
        onAction: () => {
          handleAdd(value);
          setValue("");
        },
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: closeModal,
        },
      ]}
    >
      <Modal.Section>
        <TextField error={error ? "Please enter a valid value" : undefined} value={value} onChange={handleChange} autoComplete="off" />
      </Modal.Section>
    </Modal>
  );
};

export default ModalCreate;
