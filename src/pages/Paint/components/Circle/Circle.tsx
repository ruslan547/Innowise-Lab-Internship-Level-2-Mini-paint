import { connect } from 'react-redux';
import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import { Dispatch } from '../../../../core/helpers/store';
import { RootSate } from '../../../../core/reducers/root.reducer';
import circle from '../../../../assets/img/circle.svg';
import { drawConstants } from '../../../../core/constants/draw.constants';
import { drawActions } from '../../../../core/actions/draw.actions';
import React, { useCallback } from 'react';

interface CircleProps {
  dispatch: Dispatch;
  tool: string | null;
}

function Circle({ dispatch, tool }: CircleProps): JSX.Element {
  const handleClick = useCallback(() => {
    if (tool === drawConstants.CIRCLE) {
      dispatch(drawActions.noTool());
    } else {
      dispatch(drawActions.circle());
    }
  }, [tool, dispatch]);

  return (
    <PaintButton name={drawConstants.CIRCLE} onClick={handleClick}>
      <img src={circle} alt="circle" />
    </PaintButton>
  );
}

function mapStateToProps({ drawReducer: { dispatch, tool } }: RootSate) {
  return { dispatch, tool };
}

export default connect(mapStateToProps)(React.memo(Circle));
