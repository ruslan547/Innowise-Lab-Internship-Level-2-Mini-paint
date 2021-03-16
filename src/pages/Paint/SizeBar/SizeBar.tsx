import { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { hideSizeBar, setSize, showSizeBar } from '../../../core/actions/draw.actions';
import PaintButton from '../../../core/components/PaintButton/PaintButton';
import { Dispatch } from '../../../core/helpers/store';
import { RootSate } from '../../../core/reducers/root.reducer';

interface SizeBarProps {
  isShowedSizeBar: boolean;
  size: string;
  dispatch: Dispatch;
}

function SizeBar({ isShowedSizeBar, size, dispatch }: SizeBarProps): JSX.Element {
  const handleClick = () => {
    if (isShowedSizeBar) {
      dispatch(hideSizeBar());
    } else {
      dispatch(showSizeBar());
    }
  };

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSize(value));
  };

  return (
    <div className="size-bar">
      <PaintButton onClick={handleClick}>size</PaintButton>
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
