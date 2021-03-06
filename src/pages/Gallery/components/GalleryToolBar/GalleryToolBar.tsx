import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import SignoutButton from '../../../../core/components/SignoutButton/SignoutButton';
import './GalleryToolBar.scss';
import pencil from '../../../../assets/img/pencil.svg';
import { history } from '../../../../core/helpers/history';
import { routeConstants } from '../../../../core/constants/route.constants';
import Filter from '../Filter/Filter';
import React, { useCallback } from 'react';

function GalleryToolBar(): JSX.Element {
  const handleClick = useCallback(() => {
    history.push(routeConstants.PAINT);
  }, []);

  return (
    <div className="gallery-toolbar">
      <SignoutButton />
      <Filter />
      <PaintButton onClick={handleClick}>
        <img src={pencil} alt="" />
      </PaintButton>
    </div>
  );
}

export default React.memo(GalleryToolBar);
