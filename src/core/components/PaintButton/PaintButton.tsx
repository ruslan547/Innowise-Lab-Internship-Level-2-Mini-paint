import './PaintButton.scss';
import { connect } from 'react-redux';
import { MouseEventHandler } from 'react';
import { RootSate } from '../../reducers/root.reducer';

interface PaintButtonProps {
  tool: string;
  isShowedSizeBar: boolean;
  isShowedShapeBar: boolean;
  name?: string;
  children?: JSX.Element | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function PaintButton({ tool, isShowedSizeBar, name, children, isShowedShapeBar, onClick }: PaintButtonProps) {
  let className = 'paint-btn';

  if (name === tool || (name === 'size-bar' && isShowedSizeBar) || (name === 'shape-bar' && isShowedShapeBar)) {
    className += ' active';
  }

  return (
    <button type="button" className={className} name={name} onClick={onClick}>
      {children}
    </button>
  );
}

function mapStateToProps({ drawReducer: { tool, isShowedSizeBar, isShowedShapeBar } }: RootSate) {
  return { tool, isShowedSizeBar, isShowedShapeBar };
}

export default connect(mapStateToProps)(PaintButton);
