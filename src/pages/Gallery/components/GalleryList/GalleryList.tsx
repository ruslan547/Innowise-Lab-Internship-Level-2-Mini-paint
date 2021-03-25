import React, { useEffect, useMemo } from 'react';
import { connect, useDispatch } from 'react-redux';
import scrollIntoView from 'scroll-into-view-if-needed';
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
    filteredImages = filteredImages.filter((item) => item.uid === filtredKey);
  }

  return filteredImages.map((item, i, arr) => (
    <li className="gallery-list__item" id={i === arr.length - 1 ? 'last' : undefined} key={item.image}>
      <img src={item.image} alt="" />
    </li>
  ));
}

function GalleryList({ images, filtredKey }: GalleryListProps): JSX.Element {
  const dispatch = useDispatch();
  const imgList = useMemo(() => createImgList(images, filtredKey), [images, filtredKey]);

  useEffect(() => {
    dispatch(showActions.getImages());
    dispatch(showActions.getUsers());
  }, [dispatch]);

  useEffect(() => {
    const last = document.querySelector('#last');

    if (last) {
      scrollIntoView(last, { block: 'center', inline: 'center' });
    }
  });

  return <ul className="gallery-list">{imgList}</ul>;
}

function mapStateToProps({ showReducer: { images, filtredKey } }: RootSate) {
  return { images, filtredKey };
}

export default connect(mapStateToProps)(React.memo(GalleryList));
