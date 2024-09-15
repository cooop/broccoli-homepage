import React from "react";
import "./modal.css";

interface ModalProps {
  isOpen: boolean;
  title: string;
  okText?: string;
  okDisabled?: boolean;
  onOk: () => void;
  onCancel: () => void;
  errorMessage?: string;
  children: React.ReactNode;
}
export const Modal = React.memo(function (props: ModalProps) {
  const {
    isOpen,
    title,
    okText,
    okDisabled,
    onOk,
    onCancel,
    errorMessage,
    children,
  } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-cover" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{title}</h2>
        <div className="modal-splitter" />
        <div className="modal-content">{children}</div>
        <div className="modal-buttons">
          <button className="button" disabled={okDisabled} onClick={onOk}>
            {okText || "OK"}
          </button>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
});
