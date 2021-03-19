import React from 'react';
import './FormButton.scss';

interface FormButtonProps {
  value: string;
}

function FormButton({ value }: FormButtonProps): JSX.Element {
  return <input className="form-btn" type="submit" value={value} />;
}

export default React.memo(FormButton);
