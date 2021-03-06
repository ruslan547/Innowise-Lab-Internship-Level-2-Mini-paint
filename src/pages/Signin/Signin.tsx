import './Signin.scss';
import Form from '../../core/components/Form/Form';
import FormButton from '../../core/components/FormButton/FormButton';
import Modal from '../../core/components/Modal/Modal';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../core/actions/auth.actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { history } from '../../core/helpers/history';
import { routeConstants } from '../../core/constants/route.constants';

const FORM_BTN_VALUE = 'sign in';
const MODAL_BTN_VALUE = 'register';
const MODAL_TEXT = 'Need an account?';

toast.configure();

function Signin(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleChange = useCallback(({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(authActions.signin(email, password));
    },
    [email, password, dispatch],
  );

  const handleClick = useCallback(() => {
    history.push(routeConstants.REGISTER);
  }, []);

  return (
    <div className="signin">
      <ToastContainer />
      <Modal text={MODAL_TEXT} value={MODAL_BTN_VALUE} onClick={handleClick}>
        <Form onChange={handleChange} onSubmit={handleSubmit}>
          <FormButton value={FORM_BTN_VALUE} />
        </Form>
      </Modal>
    </div>
  );
}

export default React.memo(Signin);
