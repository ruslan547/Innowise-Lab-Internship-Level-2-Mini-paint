import GalleryList from './components/GalleryList/GalleryList';
import GalleryToolBar from './components/GalleryToolBar/GalleryToolBar';
import './Gallery.scss';

function Gallery(): JSX.Element {
  return (
    <div className="gallery">
      <GalleryToolBar />
      <GalleryList />
    </div>
  );
}

export default Gallery;
