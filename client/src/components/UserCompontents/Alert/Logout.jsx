import React from "react";
import ReactDOM from "react-dom";
import "./CustomConfirmDialog.css";

const CustomConfirmDialog = ({ title, message, onConfirm, onCancel }) => {
  return ReactDOM.createPortal(
    <div className="custom-confirm-overlay">
      <div className="custom-confirm-dialog">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="custom-confirm-buttons">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CustomConfirmDialog;
