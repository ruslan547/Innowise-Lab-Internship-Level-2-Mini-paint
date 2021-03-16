import './PaintButton.scss';
import { connect } from 'react-redux';
import { MouseEventHandler } from 'react';
import { RootSate } from '../../reducers/root.reducer';

interface PaintButtonProps {
  tool: string;
  isShowedSizeBar: boolean;
  name?: string;
  children?: JSX.Element | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function PaintButton({ tool, isShowedSizeBar, name, children, onClick }: PaintButtonProps) {
  let className = 'paint-btn';

  if (name === tool || (name === 'size-bar' && isShowedSizeBar)) {
    className += ' active';
  }

  return (
    <button type="button" className={className} name={name} onClick={onClick}>
      {children}
    </button>
  );
}

function mapStateToProps({ drawReducer: { tool, isShowedSizeBar } }: RootSate) {
  return { tool, isShowedSizeBar };
}

export default connect(mapStateToProps)(PaintButton);
