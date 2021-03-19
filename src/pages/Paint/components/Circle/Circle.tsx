import { connect } from 'react-redux';
import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import { Dispatch } from '../../../../core/helpers/store';
import { RootSate } from '../../../../core/reducers/root.reducer';
import circle_img from '../../../../assets/img/circle.svg';
import { drawConstants } from '../../../../core/constants/draw.constants';
import { drawActions } from '../../../../core/actions/draw.actions';

const { CIRCLE } = drawConstants;

interface CircleProps {
  dispatch: Dispatch;
  tool: string | null;
}

function Circle({ dispatch, tool }: CircleProps): JSX.Element {
  const handleClick = () => {
    if (tool === drawConstants.CIRCLE) {
      dispatch(drawActions.noTool());
    } else {
      dispatch(drawActions.circle());
    }
  };

  return (
    <PaintButton name={CIRCLE} onClick={handleClick}>
      <img src={circle_img} alt="circle" />
    </PaintButton>
  );
}

function mapStateToProps({ drawReducer: { dispatch, tool } }: RootSate) {
  return { dispatch, tool };
}

export default connect(mapStateToProps)(Circle);
