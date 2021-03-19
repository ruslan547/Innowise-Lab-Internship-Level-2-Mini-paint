import { connect } from 'react-redux';
import { drawActions } from '../../../../core/actions/draw.actions';
import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import { drawConstants } from '../../../../core/constants/draw.constants';
import { Dispatch } from '../../../../core/helpers/store';
import { RootSate } from '../../../../core/reducers/root.reducer';
import hexagon from '../../../../assets/img/hexagon.svg';
import React, { useCallback } from 'react';

interface HexagonProps {
  dispatch: Dispatch;
  tool: string | null;
}

function Hexagon({ dispatch, tool }: HexagonProps): JSX.Element {
  const handleClick = useCallback(() => {
    if (tool === drawConstants.HEXAGON) {
      dispatch(drawActions.noTool());
    } else {
      dispatch(drawActions.hexagon());
    }
  }, [tool, dispatch]);

  return (
    <PaintButton name={drawConstants.HEXAGON} onClick={handleClick}>
      <img src={hexagon} alt="hexagon" />
    </PaintButton>
  );
}

function mapStateToProps({ drawReducer: { dispatch, tool } }: RootSate) {
  return { dispatch, tool };
}

export default connect(mapStateToProps)(React.memo(Hexagon));
