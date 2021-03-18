import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { showActions } from '../../../../core/actions/show.actions';
import { RootSate } from '../../../../core/reducers/root.reducer';
import { Image } from '../../../../core/services/firebase.db.service';
import './GalleryList.scss';

interface GalleryListProps {
  images: Record<string, Image>;
}

function GalleryList({ images }: GalleryListProps): JSX.Element {
  const dispatch = useDispatch();
  console.log(images);

  useEffect(() => {
    dispatch(showActions.getImages());
  }, []);

  return (
    <ul className="gallery-list">
      <li className="gallery-list__item">li</li>
    </ul>
  );
}

function mapStateToProps({ showReducer: { images } }: RootSate) {
  return { images };
}

export default connect(mapStateToProps)(GalleryList);
