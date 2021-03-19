import { connect } from 'react-redux';
import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import { drawConstants } from '../../../../core/constants/draw.constants';
import { Dispatch } from '../../../../core/helpers/store';
import { RootSate } from '../../../../core/reducers/root.reducer';
import rectangle_img from '../../../../assets/img/rectangle.svg';
import { drawActions } from '../../../../core/actions/draw.actions';

interface RectangleProps {
  dispatch: Dispatch;
  tool: string | null;
}

function Rectangle({ dispatch, tool }: RectangleProps): JSX.Element {
  const handleClick = () => {
    if (tool === drawConstants.RECTANGLE) {
      dispatch(drawActions.noTool());
    } else {
      dispatch(drawActions.rectangle());
    }
  };

  return (
    <PaintButton name={drawConstants.RECTANGLE} onClick={handleClick}>
      <img src={rectangle_img} alt="rectangle" />
    </PaintButton>
  );
}

function mapStateToProps({ drawReducer: { dispatch, tool } }: RootSate) {
  return { dispatch, tool };
}

export default connect(mapStateToProps)(Rectangle);
