import React from 'react';
import ColorBar from '../ColorBar/ColorBar';
import PaintBrush from '../PaintBrush/PaintBrush';
import ShapeBar from '../ShapeBar/ShapeBar';
import SizeBar from '../SizeBar/SizeBar';
import './DrawBar.scss';

function DrawBar(): JSX.Element {
  return (
    <ul className="drawbar">
      <li className="drawbar__item">
        <PaintBrush />
      </li>
      <li className="drawbar__item">
        <ShapeBar />
      </li>
      <li className="drawbar__item">
        <SizeBar />
      </li>
      <li className="drawbar__item">
        <ColorBar />
      </li>
    </ul>
  );
}

export default React.memo(DrawBar);
