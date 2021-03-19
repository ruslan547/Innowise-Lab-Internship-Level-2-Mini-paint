import NavBar from '../NavBar/NavBar';
import DrawBar from '../DrawBar/DrawBar';
import SaveButton from '../SaveButton/SaveButton';
import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import { connect } from 'react-redux';
import { RootSate } from '../../../../core/reducers/root.reducer';
import { drawService } from '../../../../core/services/draw.service';
import './PaintToolBar.scss';
import { drawActions } from '../../../../core/actions/draw.actions';
import { Dispatch } from '../../../../core/helpers/store';
import trash from '../../../../assets/img/trash.svg';

interface PaintToolBarProps {
  context: CanvasRenderingContext2D | null;
  dispatch: Dispatch;
}

function PaintToolBar({ context, dispatch }: PaintToolBarProps) {
  const handleClick = () => {
    dispatch(drawActions.deleteImg());
    if (context) {
      drawService.clearCanvas(context);
    }
  };

  return (
    <div className="paint-toolbar">
      <NavBar />
      <DrawBar />
      <div>
        <div className="clear-btn">
          <PaintButton onClick={handleClick}>
            <img src={trash} alt="" />
          </PaintButton>
        </div>
        <SaveButton />
      </div>
    </div>
  );
}

function mapStateToProps({ drawReducer: { context, dispatch } }: RootSate) {
  return { context, dispatch };
}

export default connect(mapStateToProps)(PaintToolBar);
