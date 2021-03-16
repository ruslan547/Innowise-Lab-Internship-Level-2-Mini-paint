import { connect } from 'react-redux';
import PaintButton from '../../../core/components/PaintButton/PaintButton';
import { drawConstants } from '../../../core/constants/draw.constants';
import { Dispatch } from '../../../core/helpers/store';
import { RootSate } from '../../../core/reducers/root.reducer';
import pencil_img from '../../../assets/img/pencil.svg';
import { noTool, paintbrush } from '../../../core/actions/draw.actions';

const { PAINTBRUSH } = drawConstants;

interface PaintBrushProps {
  dispatch: Dispatch;
  tool: string | null;
}

function PaintBrush({ dispatch, tool }: PaintBrushProps) {
  const handleClick = () => {
    if (tool === PAINTBRUSH) {
      dispatch(noTool());
    } else {
      dispatch(paintbrush());
    }
  };

  return (
    <PaintButton name={PAINTBRUSH} onClick={handleClick}>
      <img src={pencil_img} alt="" />
    </PaintButton>
  );
}

function mapStateToProps({ drawReducer: { dispatch, tool } }: RootSate) {
  return { dispatch, tool };
}

export default connect(mapStateToProps)(PaintBrush);
