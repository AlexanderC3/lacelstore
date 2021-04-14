import React, { useState } from "react";
import "./styles.scss";

export const Modal = ({ hideModal, toggleModal, children }) => {
  if (hideModal) return null;

  return [
    <div className="modalOverlay" onClick={() => toggleModal()} />,
    <div className="modalWrap">
      <div className="modal">{children}</div>
    </div>,
  ];
};

export const Modal2 = ({ hideModal2, toggleModal2, children }) => {
  if (hideModal2) return null;

  return [
    <div className="modalOverlay" onClick={() => toggleModal2()} />,
    <div className="modalWrap">
      <div className="modal">{children}</div>
    </div>,
  ];
};
