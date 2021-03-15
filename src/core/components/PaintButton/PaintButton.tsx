import './PaintButton.scss';
import { connect } from 'react-redux';
import { MouseEventHandler } from 'react';

interface PaintButtonProps {
  value?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function PaintButton({ value, onClick }: PaintButtonProps) {
  return (
    <button type="button" className="paint-btn" onClick={onClick}>
      <img src={value} alt="" />
    </button>
  );
}

export default connect()(PaintButton);
