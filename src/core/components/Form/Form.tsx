import React from 'react';
import './Form.scss';

interface IFormProps {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  children?: JSX.Element | Array<JSX.Element>;
}

function Form({ onSubmit, onChange, children }: IFormProps) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <input className="form__email" type="email" name="email" placeholder="email" onChange={onChange} required />
      <input
        className="form__password"
        type="password"
        name="password"
        placeholder="password"
        onChange={onChange}
        required
      />
      {children}
    </form>
  );
}

export default React.memo(Form);
