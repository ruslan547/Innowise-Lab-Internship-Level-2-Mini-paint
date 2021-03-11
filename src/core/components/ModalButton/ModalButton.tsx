import React from 'react';
import './ModalButton.scss';

interface IModalButtonProps {
  value?: string;
  onClick?: () => void;
}

function ModalButton({ value, onClick }: IModalButtonProps) {
  return (
    <button className="modal-btn" onClick={onClick}>
      {value}
    </button>
  );
}

export default React.memo(ModalButton);
