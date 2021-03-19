import React, { ChangeEvent, useMemo } from 'react';
import { connect } from 'react-redux';
import { showActions } from '../../../../core/actions/show.actions';
import { store } from '../../../../core/helpers/store';
import { RootSate } from '../../../../core/reducers/root.reducer';
import { Image } from '../../../../core/services/firebase.db.service';
import './Filter.scss';

interface FilterProps {
  images: Record<string, Image>;
  filtredKey: string;
}

function createOptions(images: Record<string, Image>): Array<JSX.Element> {
  const emails = Object.values(images).map((item) => item.email);

  emails.push('all');

  return Array.from(new Set(emails)).map((item) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  });
}

function Filter({ filtredKey, images }: FilterProps) {
  const options = useMemo(() => createOptions(images), [images]);

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    store.dispatch(showActions.filterImages(value));
  };

  return (
    <select className="filter" value={filtredKey} onChange={handleChange}>
      {options}
    </select>
  );
}

function mapStateToProps({ showReducer: { filtredKey, images } }: RootSate) {
  return { filtredKey, images };
}

export default connect(mapStateToProps)(React.memo(Filter));
