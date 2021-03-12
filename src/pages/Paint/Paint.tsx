import { connect } from 'react-redux';
import PaintButton from '../../core/components/PaintButton/PaintButton';
import './Paint.scss';

function Paint(): JSX.Element {
  return (
    <div className="paint">
      <div className="toolbar">
        <PaintButton />
        <div className="toolbar__draw"></div>
        <PaintButton />
      </div>
      <canvas className="mainview"></canvas>
    </div>
  );
}

function mapStateToProps(state: any) {
  return;
}

export default connect(mapStateToProps)(Paint);
