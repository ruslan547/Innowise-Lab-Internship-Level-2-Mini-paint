import { connect } from 'react-redux';
import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import './NavBar.scss';
import picture from '../../../../assets/img/picture.svg';
import { history } from '../../../../core/helpers/history';
import { routeConstants } from '../../../../core/constants/route.constants';
import SignoutButton from '../../../../core/components/SignoutButton/SignoutButton';
import { RootSate } from '../../../../core/reducers/root.reducer';
import { Dispatch } from '../../../../core/helpers/store';
import { drawActions } from '../../../../core/actions/draw.actions';
import React, { useCallback } from 'react';

interface NavBarProps {
  dispatch: Dispatch;
  img: HTMLImageElement;
}

function NavBar({ dispatch, img }: NavBarProps): JSX.Element {
  const handleClick = useCallback(async () => {
    dispatch(drawActions.deleteImg());
    dispatch(drawActions.clear());
    history.push(routeConstants.GALLERY);
  }, [dispatch]);

  return (
    <ul className="navbar">
      <li className="navbar__item">
        <SignoutButton />
      </li>
      <li className="navbar__item">
        <PaintButton onClick={handleClick}>
          <img src={picture} alt="" />
        </PaintButton>
      </li>
    </ul>
  );
}

function mapStateToProps({ drawReducer: { img, dispatch } }: RootSate) {
  return { dispatch, img };
}

export default connect(mapStateToProps)(React.memo(NavBar));
