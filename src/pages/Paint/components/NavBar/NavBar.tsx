import { useDispatch } from 'react-redux';
import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import './NavBar.scss';
import picture_img from '../../../../assets/img/picture.svg';
import { history } from '../../../../core/helpers/history';
import { routeConstants } from '../../../../core/constants/route.constants';
import SignoutButton from '../../../../core/components/SignoutButton/SignoutButton';

function NavBar(): JSX.Element {
  const handleGalleryClick = () => {
    history.push(routeConstants.GALLERY);
  };

  return (
    <ul className="navbar">
      <li className="navbar__item">
        <SignoutButton />
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
