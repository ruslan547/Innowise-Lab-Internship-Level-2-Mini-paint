import { connect } from 'react-redux';
import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import { drawConstants } from '../../../../core/constants/draw.constants';
import { Dispatch } from '../../../../core/helpers/store';
import { RootSate } from '../../../../core/reducers/root.reducer';
import rectangle_img from '../../../../assets/img/rectangle.svg';
import { drawActions } from '../../../../core/actions/draw.actions';

const { RECTANGLE } = drawConstants;

interface RectangleProps {
  dispatch: Dispatch;
}

function Rectangle({ dispatch }: RectangleProps): JSX.Element {
  const handleClick = () => {
    dispatch(drawActions.rectangle());
  };

  return (
    <PaintButton name={RECTANGLE} onClick={handleClick}>
      <img src={rectangle_img} alt="rectangle" />
    </PaintButton>
  );
}

function mapStateToProps({ drawReducer: { dispatch } }: RootSate) {
  return { dispatch };
}

export default connect(mapStateToProps)(Rectangle);
