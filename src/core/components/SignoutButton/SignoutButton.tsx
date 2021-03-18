import React from 'react';
import PaintButton from '../PaintButton/PaintButton';
import logout_img from '../../../assets/img/logout.svg';
import { useDispatch } from 'react-redux';
import { authActions } from '../../actions/auth.actions';

function SignoutButton() {
  const dispatch = useDispatch();

  const handleSignoutClick = () => {
    dispatch(authActions.signout());
  };

  return (
    <PaintButton onClick={handleSignoutClick}>
      <img src={logout_img} alt="" />
    </PaintButton>
  );
}

export default React.memo(SignoutButton);
