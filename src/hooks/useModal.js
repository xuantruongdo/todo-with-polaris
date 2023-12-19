import React, { useState } from "react";
import { Modal } from "@shopify/polaris";

/**
 *
 * @param confirmAction
 * @param cancelAction
 * @param title
 * @param content
 * @param buttonTitle
 * @param closeTitle
 * @param loading
 * @param disabled
 * @param destructive
 * @param closeCallback
 * @param canCloseAfterFinished
 * @param successCallback
 * @param sectioned
 * @param large
 * @param isConfirmButton
 * @param disabledSecondBtn
 * @param loadingSecondBtn
 * @param titleHidden
 * @param secondaryActions
 * @returns {{openModal: openModal, closeModal: closeModal, modal: JSX.Element, open: boolean}}
 */

export default function useModal({
  confirmAction,
  cancelAction,
  title = "Modal",
  content,
  buttonTitle = "Create",
  closeTitle = "Close",
  loading = false,
  disabled = false,
  destructive = false,
  closeCallback = () => {},
  canCloseAfterFinished = true,
  successCallback = () => {},
  sectioned = true,
  large = false,
  isConfirmButton = true,
  disabledSecondBtn = false,
  loadingSecondBtn = loading,
  titleHidden = false,
  secondaryActions = [],
}) {
  const [open, setOpen] = useState(false);

  const openModal = (id = null) => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    confirmAction();
  };
  const modal = (
    <Modal
      open={open}
      onClose={closeModal}
      title={title}
      primaryAction={{
        content: buttonTitle,
        primary: true,
        onAction: handleConfirm,
      }}
      secondaryActions={[
        {
          content: closeTitle,
          onAction: closeModal,
        },
      ]}
    >
      <Modal.Section>{content}</Modal.Section>
    </Modal>
  );

  return { modal, open, closeModal, openModal };
}
