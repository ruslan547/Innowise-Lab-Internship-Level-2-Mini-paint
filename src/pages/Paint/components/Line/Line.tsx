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
}

function Line({ dispatch }: LineProps): JSX.Element {
  const handleClick = () => {
    dispatch(drawActions.line());
  };

  return (
    <PaintButton name={LINE} onClick={handleClick}>
      <img src={line_img} alt="line" />
    </PaintButton>
  );
}

function mapStateToProps({ drawReducer: { dispatch } }: RootSate) {
  return { dispatch };
}

export default connect(mapStateToProps)(Line);
