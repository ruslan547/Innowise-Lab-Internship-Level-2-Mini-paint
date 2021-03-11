import React from 'react';
import './FormButton.scss';

interface IFormButtonProps {
  value: string;
}

function FormButton({ value }: IFormButtonProps): JSX.Element {
  return <input className="form-btn" type="submit" value={value} />;
}

export default React.memo(FormButton);
