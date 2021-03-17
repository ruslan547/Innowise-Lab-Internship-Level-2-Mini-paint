import { connect } from 'react-redux';
import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import { Dispatch } from '../../../../core/helpers/store';
import { RootSate } from '../../../../core/reducers/root.reducer';
import circle_img from '../../../../assets/img/circle.svg';
import { circle } from '../../../../core/actions/draw.actions';
import { drawConstants } from '../../../../core/constants/draw.constants';

const { CIRCLE } = drawConstants;

interface CircleProps {
  dispatch: Dispatch;
}

function Circle({ dispatch }: CircleProps): JSX.Element {
  const handleClick = () => {
    dispatch(circle());
  };

  return (
    <PaintButton name={CIRCLE} onClick={handleClick}>
      <img src={circle_img} alt="circle" />
    </PaintButton>
  );
}

function mapStateToProps({ drawReducer: { dispatch } }: RootSate) {
  return { dispatch };
}

export default connect(mapStateToProps)(Circle);
