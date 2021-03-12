import './Signin.scss';
import Form from '../../core/components/Form/Form';
import FormButton from '../../core/components/FormButton/FormButton';
import Modal from '../../core/components/Modal/Modal';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../../core/actions/auth.actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../core/components/Loader/Loader';
import { history } from '../../core/helpers/history';
import { routeConstants } from '../../core/constants/route.constants';

const FORM_BTN_VALUE = 'sign in';
const MODAL_BTN_VALUE = 'register';
const MODAL_TEXT = 'Need an account?';

toast.configure();

interface ISigninProps {
  loading: boolean;
  dispatch: (action: any) => void;
}

function Signin({ dispatch, loading }: ISigninProps): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(authActions.signin(email, password));
  };

  const handleClick = () => {
    history.push(routeConstants.REGISTER);
  };

  return (
    <div className="signin">
      {loading && <Loader />}
      <ToastContainer />
      <Modal text={MODAL_TEXT} value={MODAL_BTN_VALUE} onClick={handleClick}>
        <Form onChange={handleChange} onSubmit={handleSubmit}>
          <FormButton value={FORM_BTN_VALUE} />
        </Form>
      </Modal>
    </div>
  );
}

function mapStateToProps(state: any) {
  const { user, loading } = state.authReducer;
  return { user, loading };
}

export default connect(mapStateToProps)(Signin);
