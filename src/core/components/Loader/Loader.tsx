import React from 'react';
import './Loader.scss';

function Loader(): JSX.Element {
  return <div className="loader">Loading...</div>;
}

export default React.memo(Loader);
