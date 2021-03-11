import React from 'react';
import './Form.scss';

interface IFormProps {
  onSubmit?: () => void;
  children?: JSX.Element;
}

function Form({ onSubmit, children }: IFormProps) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <input className="form__email" placeholder="email" />
      <input className="form__password" placeholder="password" />
      {children}
    </form>
  );
}

export default React.memo(Form);
