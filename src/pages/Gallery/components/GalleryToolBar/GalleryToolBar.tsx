import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import SignoutButton from '../../../../core/components/SignoutButton/SignoutButton';
import './GalleryToolBar.scss';
import pencil from '../../../../assets/img/pencil.svg';
import { history } from '../../../../core/helpers/history';
import { routeConstants } from '../../../../core/constants/route.constants';
import Filter from '../Filter/Filter';

function GalleryToolBar(): JSX.Element {
  const handlePaintBtnClick = () => {
    history.push(routeConstants.PAINT);
  };

  return (
    <div className="gallery-toolbar">
      <SignoutButton />
      <Filter />
      <PaintButton onClick={handlePaintBtnClick}>
        <img src={pencil} alt="" />
      </PaintButton>
    </div>
  );
}

export default GalleryToolBar;