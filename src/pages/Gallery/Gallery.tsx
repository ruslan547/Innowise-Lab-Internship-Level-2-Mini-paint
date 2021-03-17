import { connect } from 'react-redux';
import { User } from '../../core/actions/auth.actions';
import { RootSate } from '../../core/reducers/root.reducer';
import './Gallery.scss';

export interface GalleryProps {
  user: User;
}

// eslint-disable-next-line prettier/prettier
function Gallery({ user }: GalleryProps): JSX.Element {
  return <div>gallery</div>;
}

function mapStateToProps({ authReducer: { user } }: RootSate) {
  return { user };
}

export default connect(mapStateToProps)(Gallery);
