import './PaintButton.scss';
import { connect } from 'react-redux';
import { MouseEventHandler } from 'react';
import { RootSate } from '../../reducers/root.reducer';

interface PaintButtonProps {
  tool: string;
  name?: string;
  children?: JSX.Element | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function PaintButton({ tool, name, children, onClick }: PaintButtonProps) {
  let className = 'paint-btn';

  if (name === tool) {
    className += ' active';
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}

function mapStateToProps({ drawReducer: { tool } }: RootSate) {
  return { tool };
}

export default connect(mapStateToProps)(PaintButton);
