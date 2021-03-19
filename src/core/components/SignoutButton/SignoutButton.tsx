import React, { useCallback } from 'react';
import PaintButton from '../PaintButton/PaintButton';
import logout_img from '../../../assets/img/logout.svg';
import { useDispatch } from 'react-redux';
import { authActions } from '../../actions/auth.actions';

function SignoutButton() {
  const dispatch = useDispatch();

  const handleSignoutClick = useCallback(() => {
    dispatch(authActions.signout());
  }, [dispatch]);

  return (
    <PaintButton onClick={handleSignoutClick}>
      <img src={logout_img} alt="" />
    </PaintButton>
  );
}

export default React.memo(SignoutButton);
