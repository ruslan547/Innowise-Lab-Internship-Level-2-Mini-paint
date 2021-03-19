import React from 'react';
import './ModalButton.scss';

interface ModalButtonProps {
  value?: string;
  onClick?: () => void;
}

function ModalButton({ value, onClick }: ModalButtonProps) {
  return (
    <button className="modal-btn" onClick={onClick}>
      {value}
    </button>
  );
}

export default React.memo(ModalButton);
