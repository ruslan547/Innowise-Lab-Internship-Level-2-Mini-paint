import { useDispatch } from 'react-redux';
import { authActions } from '../../../../core/actions/auth.actions';
import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import './NavBar.scss';
import logout_img from '../../../../assets/img/logout.svg';
import picture_img from '../../../../assets/img/picture.svg';
import { history } from '../../../../core/helpers/history';
import { routeConstants } from '../../../../core/constants/route.constants';

function NavBar(): JSX.Element {
  const dispatch = useDispatch();

  const handleSignoutClick = () => {
    dispatch(authActions.signout());
  };

  const handleGalleryClick = () => {
    history.push(routeConstants.GALLERY);
  };

  return (
    <ul className="navbar">
      <li className="navbar__item">
        <PaintButton onClick={handleSignoutClick}>
          <img src={logout_img} alt="" />
        </PaintButton>
      </li>
      <li className="navbar__item">
        <PaintButton onClick={handleGalleryClick}>
          <img src={picture_img} alt="" />
        </PaintButton>
      </li>
    </ul>
  );
}

export default NavBar;
