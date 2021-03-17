import { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { drawActions } from '../../../../core/actions/draw.actions';
import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import { Dispatch } from '../../../../core/helpers/store';
import { RootSate } from '../../../../core/reducers/root.reducer';
import './SizeBar.scss';

interface SizeBarProps {
  isShowedSizeBar: boolean;
  size: string;
  dispatch: Dispatch;
}

function SizeBar({ isShowedSizeBar, size, dispatch }: SizeBarProps): JSX.Element {
  const handleClick = () => {
    if (isShowedSizeBar) {
      dispatch(drawActions.hideSizeBar());
    } else {
      dispatch(drawActions.showSizeBar());
    }
  };

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    dispatch(drawActions.setSize(value));
  };

  return (
    <div className="size-bar">
      <PaintButton name="size-bar" onClick={handleClick}>
        size
      </PaintButton>
      {isShowedSizeBar && (
        <div className="size-bar__setting">
          <input type="range" name="range" min="1" max="50" value={size} onChange={handleChange} />
          <span>{size}</span>
        </div>
      )}
    </div>
  );
}

function mapStateToProps({ drawReducer: { isShowedSizeBar, size, dispatch } }: RootSate) {
  return { isShowedSizeBar, size, dispatch };
}

export default connect(mapStateToProps)(SizeBar);
