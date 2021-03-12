import './PaintButton.scss';
import { connect } from 'react-redux';

function PaintButton() {
  return <button className="paint-btn"></button>;
}

export default connect()(PaintButton);
