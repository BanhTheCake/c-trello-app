import React from "react";
import './ModalConfirmDeleteCol.scss'
import { IoMdClose } from 'react-icons/io'

const ModalConfirmDeleteCol = ({ title, onAction }) => {
  return (
    <div className="Modal-delete">
        <div className="overlay" onClick={() => onAction('close')}></div>
        <div className="Modal-main">
          <div className="icon-wrapper" onClick={() => onAction('close')}>
            <IoMdClose size={28} />
          </div>
          <div className="Modal-delete__content">
              { title }
          </div>
          <div className="Modal-delete__button">
            <button className="btn btn-confirm" onClick={() => onAction('confirm')}>Confirm</button>
            <button className="btn btn-cancel" onClick={() => onAction('close')}>Cancel</button>
          </div>
        </div>
    </div>
  );
};

export default ModalConfirmDeleteCol;
