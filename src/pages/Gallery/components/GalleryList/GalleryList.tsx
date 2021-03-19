import React, { useEffect, useMemo } from 'react';
import { connect, useDispatch } from 'react-redux';
import { showActions } from '../../../../core/actions/show.actions';
import { RootSate } from '../../../../core/reducers/root.reducer';
import { Image } from '../../../../core/services/firebase.db.service';
import './GalleryList.scss';

interface GalleryListProps {
  images: Record<string, Image>;
  filtredKey: string;
}

function createImgList(images: Record<string, Image>, filtredKey: string) {
  let filteredImages = Object.values(images);

  if (filtredKey !== 'all') {
    filteredImages = filteredImages.filter((item) => item.email === filtredKey);
  }

  return filteredImages.map((item) => (
    <li className="gallery-list__item" key={item.image}>
      <img src={item.image} alt="" />
    </li>
  ));
}

function GalleryList({ images, filtredKey }: GalleryListProps): JSX.Element {
  const dispatch = useDispatch();
  const imgList = useMemo(() => createImgList(images, filtredKey), [images, filtredKey]);

  useEffect(() => {
    dispatch(showActions.getImages());
  }, [dispatch]);

  return <ul className="gallery-list">{imgList}</ul>;
}

function mapStateToProps({ showReducer: { images, filtredKey } }: RootSate) {
  return { images, filtredKey };
}

export default connect(mapStateToProps)(React.memo(GalleryList));
