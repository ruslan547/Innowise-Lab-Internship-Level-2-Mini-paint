import { connect } from 'react-redux';
import { drawActions } from '../../../../core/actions/draw.actions';
import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import { drawConstants } from '../../../../core/constants/draw.constants';
import { Dispatch } from '../../../../core/helpers/store';
import { RootSate } from '../../../../core/reducers/root.reducer';
import hexagon from '../../../../assets/img/hexagon.svg';

interface HexagonProps {
  dispatch: Dispatch;
}

function Hexagon({ dispatch }: HexagonProps): JSX.Element {
  const handleClick = () => {
    dispatch(drawActions.hexagon());
  };

  return (
    <PaintButton name={drawConstants.HEXAGON} onClick={handleClick}>
      <img src={hexagon} alt="hexagon" />
    </PaintButton>
  );
}

function mapStateToProps({ drawReducer: { dispatch } }: RootSate) {
  return { dispatch };
}

export default connect(mapStateToProps)(Hexagon);
