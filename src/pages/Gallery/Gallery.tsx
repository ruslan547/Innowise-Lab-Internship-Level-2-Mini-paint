import { connect } from 'react-redux';
import { User } from '../../core/actions/auth.actions';
import { RootSate } from '../../core/reducers/root.reducer';
import './Gallery.scss';

export interface GalleryProps {
  user: User;
}

function Gallery({ user }: GalleryProps): JSX.Element {
  return <div>{user.email}</div>;
}

function mapStateToProps({ authReducer: { user } }: RootSate) {
  return { user };
}

export default connect(mapStateToProps)(Gallery);
