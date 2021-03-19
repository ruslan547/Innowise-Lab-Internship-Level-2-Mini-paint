import './Paint.scss';
import PaintToolBar from './components/PaintToolBar/PaintToolBar';
import MainView from './components/MainView/MainView';
import React from 'react';

function Paint(): JSX.Element {
  return (
    <div className="paint">
      <MainView />
      <PaintToolBar />
    </div>
  );
}

export default React.memo(Paint);
