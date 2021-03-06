import { connect } from 'react-redux';
import { drawActions } from '../../../../core/actions/draw.actions';
import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import { Dispatch } from '../../../../core/helpers/store';
import { RootSate } from '../../../../core/reducers/root.reducer';
import Circle from '../Circle/Circle';
import Line from '../Line/Line';
import Polygon from '../Hexagon/Hexagon';
import Rectangle from '../Rectangle/Rectangle';
import Star from '../Star/Star';
import './ShapeBar.scss';
import points from '../../../../assets/img/points.svg';
import { useCallback } from 'react';

interface ShapeBarProps {
  dispatch: Dispatch;
  isShowedShapeBar: boolean;
}

function ShapeBar({ dispatch, isShowedShapeBar }: ShapeBarProps): JSX.Element {
  const handleClick = useCallback(() => {
    if (isShowedShapeBar) {
      dispatch(drawActions.hideShapeBar());
    } else {
      dispatch(drawActions.showShapeBar());
    }
  }, [isShowedShapeBar, dispatch]);

  return (
    <div className="shape-bar">
      <PaintButton name="shape-bar" onClick={handleClick}>
        <img src={points} alt="" />
      </PaintButton>
      {isShowedShapeBar && (
        <ul className="shape-bar__setting">
          <li className="shape-bar__item">
            <Line />
          </li>
          <li className="shape-bar__item">
            <Circle />
          </li>
          <li className="shape-bar__item">
            <Rectangle />
          </li>
          <li className="shape-bar__item">
            <Star />
          </li>
          <li className="shape-bar__item">
            <Polygon />
          </li>
        </ul>
      )}
    </div>
  );
}

function mapStateToProps({ drawReducer: { dispatch, isShowedShapeBar } }: RootSate) {
  return { dispatch, isShowedShapeBar };
}

export default connect(mapStateToProps)(ShapeBar);
