import { connect } from 'react-redux';
import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import { drawConstants } from '../../../../core/constants/draw.constants';
import { Dispatch } from '../../../../core/helpers/store';
import { RootSate } from '../../../../core/reducers/root.reducer';
import rectangle from '../../../../assets/img/rectangle.svg';
import { drawActions } from '../../../../core/actions/draw.actions';
import React, { useCallback } from 'react';

interface RectangleProps {
  dispatch: Dispatch;
  tool: string | null;
}

function Rectangle({ dispatch, tool }: RectangleProps): JSX.Element {
  const handleClick = useCallback(() => {
    if (tool === drawConstants.RECTANGLE) {
      dispatch(drawActions.noTool());
    } else {
      dispatch(drawActions.rectangle());
    }
  }, [tool, dispatch]);

  return (
    <PaintButton name={drawConstants.RECTANGLE} onClick={handleClick}>
      <img src={rectangle} alt="rectangle" />
    </PaintButton>
  );
}

function mapStateToProps({ drawReducer: { dispatch, tool } }: RootSate) {
  return { dispatch, tool };
}

export default connect(mapStateToProps)(React.memo(Rectangle));
