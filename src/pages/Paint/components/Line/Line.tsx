import { connect } from 'react-redux';
import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import line_img from '../../../../assets/img/line.svg';
import { drawConstants } from '../../../../core/constants/draw.constants';
import { Dispatch } from '../../../../core/helpers/store';
import { RootSate } from '../../../../core/reducers/root.reducer';
import { drawActions } from '../../../../core/actions/draw.actions';

const { LINE } = drawConstants;

interface LineProps {
  dispatch: Dispatch;
  tool: string | null;
}

function Line({ dispatch, tool }: LineProps): JSX.Element {
  const handleClick = () => {
    if (tool === drawConstants.LINE) {
      dispatch(drawActions.noTool());
    } else {
      dispatch(drawActions.line());
    }
  };

  return (
    <PaintButton name={LINE} onClick={handleClick}>
      <img src={line_img} alt="line" />
    </PaintButton>
  );
}

function mapStateToProps({ drawReducer: { dispatch, tool } }: RootSate) {
  return { dispatch, tool };
}

export default connect(mapStateToProps)(Line);
