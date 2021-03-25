import React, { ChangeEvent, useMemo } from 'react';
import { connect } from 'react-redux';
import { User } from '../../../../core/actions/auth.actions';
import { showActions } from '../../../../core/actions/show.actions';
import { store } from '../../../../core/helpers/store';
import { RootSate } from '../../../../core/reducers/root.reducer';
import { Image } from '../../../../core/services/firebase.db.service';
import './Filter.scss';

interface FilterProps {
  images: Record<string, Image>;
  filtredKey: string;
  users: Record<string, User>;
}

function createOptions(images: Record<string, Image>, users: Record<string, User>): Array<JSX.Element> {
  const emails = Object.values(images)
    .filter(({ uid }) => users.hasOwnProperty(uid))
    .map(({ uid }) => users[uid].email);

  const usersWithImg = Object.entries(users).filter((user) => emails.includes(user[1].email));

  usersWithImg.push(['all', { email: 'all' }]);

  return usersWithImg.map(([uid, value]) => {
    return (
      <option key={uid} value={uid}>
        {value.email}
      </option>
    );
  });
}

function Filter({ filtredKey, images, users }: FilterProps) {
  const options = useMemo(() => createOptions(images, users), [images, users]);

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    store.dispatch(showActions.filterImages(value));
  };

  return (
    <select className="filter" value={filtredKey} onChange={handleChange}>
      {options}
    </select>
  );
}

function mapStateToProps({ showReducer: { filtredKey, images, users } }: RootSate) {
  return { filtredKey, images, users };
}

export default connect(mapStateToProps)(React.memo(Filter));
