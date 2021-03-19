import { connect } from 'react-redux';
import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import { drawConstants } from '../../../../core/constants/draw.constants';
import { Dispatch } from '../../../../core/helpers/store';
import { RootSate } from '../../../../core/reducers/root.reducer';
import pencil from '../../../../assets/img/pencil.svg';
import { drawActions } from '../../../../core/actions/draw.actions';
import React, { useCallback } from 'react';

interface PaintBrushProps {
  dispatch: Dispatch;
  tool: string | null;
}

function PaintBrush({ dispatch, tool }: PaintBrushProps) {
  const handleClick = useCallback(() => {
    if (tool === drawConstants.PAINTBRUSH) {
      dispatch(drawActions.noTool());
    } else {
      dispatch(drawActions.paintbrush());
    }
  }, [dispatch, tool]);

  return (
    <PaintButton name={drawConstants.PAINTBRUSH} onClick={handleClick}>
      <img src={pencil} alt="" />
    </PaintButton>
  );
}

function mapStateToProps({ drawReducer: { dispatch, tool } }: RootSate) {
  return { dispatch, tool };
}

export default connect(mapStateToProps)(React.memo(PaintBrush));
