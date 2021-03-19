import { drawActions } from '../../../../core/actions/draw.actions';
import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import { drawConstants } from '../../../../core/constants/draw.constants';
import { Dispatch } from '../../../../core/helpers/store';
import star from '../../../../assets/img/star.svg';
import { RootSate } from '../../../../core/reducers/root.reducer';
import { connect } from 'react-redux';

interface StarProps {
  dispatch: Dispatch;
}

function Star({ dispatch }: StarProps): JSX.Element {
  const handleClick = () => {
    dispatch(drawActions.star());
  };

  return (
    <PaintButton name={drawConstants.STAR} onClick={handleClick}>
      <img src={star} alt="star" />
    </PaintButton>
  );
}

function mapStateToProps({ drawReducer: { dispatch } }: RootSate) {
  return { dispatch };
}

export default connect(mapStateToProps)(Star);
