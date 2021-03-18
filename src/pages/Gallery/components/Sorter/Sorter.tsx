import { ChangeEvent, useMemo } from 'react';
import { connect } from 'react-redux';
import { showActions } from '../../../../core/actions/show.actions';
import { store } from '../../../../core/helpers/store';
import { RootSate } from '../../../../core/reducers/root.reducer';
import { Image } from '../../../../core/services/firebase.db.service';
import './Sorter.scss';

interface SorterProps {
  images: Record<string, Image>;
  sortKey: string;
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

function Sorter({ sortKey, images }: SorterProps) {
  const options = useMemo(() => createOptions(images), [images]);

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    store.dispatch(showActions.sort(value));
  };

  return (
    <select className="sorter" value={sortKey} onChange={handleChange}>
      {options}
    </select>
  );
}

function mapStateToProps({ showReducer: { sortKey, images } }: RootSate) {
  return { sortKey, images };
}

export default connect(mapStateToProps)(Sorter);
