import { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { setColor } from '../../../core/actions/draw.actions';
import PaintButton from '../../../core/components/PaintButton/PaintButton';
import { Dispatch } from '../../../core/helpers/store';
import { RootSate } from '../../../core/reducers/root.reducer';

interface ColorBarProps {
  dispatch: Dispatch;
  color: string;
}

function ColorBar({ dispatch, color }: ColorBarProps) {
  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    dispatch(setColor(value));
  };

  return (
    <PaintButton>
      <input className="color-input" value={color} type="color" name="color" onChange={handleChange} />
    </PaintButton>
  );
}

function mapStateToProps({ drawReducer: { dispatch, color } }: RootSate) {
  return { dispatch, color };
}

export default connect(mapStateToProps)(ColorBar);
