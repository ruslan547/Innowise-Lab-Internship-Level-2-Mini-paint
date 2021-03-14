import './PaintButton.scss';
import { connect } from 'react-redux';
import { MouseEventHandler } from 'react';

interface PaintButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function PaintButton({ onClick }: PaintButtonProps) {
  return <button type="button" className="paint-btn" onClick={onClick}></button>;
}

export default connect()(PaintButton);
