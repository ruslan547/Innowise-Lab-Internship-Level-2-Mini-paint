import './Paint.scss';
import PaintToolBar from './components/PaintToolBar/PaintToolBar';
import MainView from './components/MainView/MainView';

function Paint(): JSX.Element {
  return (
    <div className="paint">
      <MainView />
      <PaintToolBar />
    </div>
  );
}

export default Paint;
