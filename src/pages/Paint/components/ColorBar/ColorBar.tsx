import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { drawActions } from '../../../../core/actions/draw.actions';
import { Dispatch } from '../../../../core/helpers/store';
import { RootSate } from '../../../../core/reducers/root.reducer';
import './ColorBar.scss';

interface ColorBarProps {
  dispatch: Dispatch;
  color: string;
}

function ColorBar({ dispatch, color }: ColorBarProps) {
  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    dispatch(drawActions.setColor(value));
  };

  return <input className="color-input" value={color} type="color" name="color" onChange={handleChange} />;
}

function mapStateToProps({ drawReducer: { dispatch, color } }: RootSate) {
  return { dispatch, color };
}

export default connect(mapStateToProps)(React.memo(ColorBar));
