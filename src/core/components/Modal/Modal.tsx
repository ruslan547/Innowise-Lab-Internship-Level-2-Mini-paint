import React from 'react';
import ModalButton from '../ModalButton/ModalButton';
import './Modal.scss';

interface IModalProps {
  children?: JSX.Element;
  text?: string;
  value?: string;
  onSubmit?: () => void;
  onClick?: () => void;
}

function Modal({ children, text, value, onClick }: IModalProps) {
  return (
    <div className="modal">
      {children}
      <div className="modal__footer">
        <span className="modal__text">{text}</span>
        <ModalButton value={value} onClick={onClick} />
      </div>
    </div>
  );
}

export default React.memo(Modal);
