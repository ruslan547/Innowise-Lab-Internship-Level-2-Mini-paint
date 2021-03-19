import { connect } from 'react-redux';
import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import line from '../../../../assets/img/line.svg';
import { drawConstants } from '../../../../core/constants/draw.constants';
import { Dispatch } from '../../../../core/helpers/store';
import { RootSate } from '../../../../core/reducers/root.reducer';
import { drawActions } from '../../../../core/actions/draw.actions';
import React, { useCallback } from 'react';

interface LineProps {
  dispatch: Dispatch;
  tool: string | null;
}

function Line({ dispatch, tool }: LineProps): JSX.Element {
  const handleClick = useCallback(() => {
    if (tool === drawConstants.LINE) {
      dispatch(drawActions.noTool());
    } else {
      dispatch(drawActions.line());
    }
  }, [tool, dispatch]);

  return (
    <PaintButton name={drawConstants.LINE} onClick={handleClick}>
      <img src={line} alt="line" />
    </PaintButton>
  );
}

function mapStateToProps({ drawReducer: { dispatch, tool } }: RootSate) {
  return { dispatch, tool };
}

export default connect(mapStateToProps)(React.memo(Line));
