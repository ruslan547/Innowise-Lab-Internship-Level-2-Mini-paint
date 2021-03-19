import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { authActions } from '../../core/actions/auth.actions';
import Form from '../../core/components/Form/Form';
import FormButton from '../../core/components/FormButton/FormButton';
import Loader from '../../core/components/Loader/Loader';
import Modal from '../../core/components/Modal/Modal';
import { routeConstants } from '../../core/constants/route.constants';
import { history } from '../../core/helpers/history';
import { RootSate } from '../../core/reducers/root.reducer';
import './Register.scss';

const MODAL_TEXT = 'Already have an account?';
const MODAL_BTN_VALUE = 'sign in';
const FORM_BTN_VALUE = 'register';
const ERROR_TEXT = 'Passwords do not match';

toast.configure();

interface RegisterProps {
  loading: boolean;
}

function Register({ loading }: RegisterProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const toastId = useRef('');
  const dispatch = useDispatch();

  const handleChange = useCallback(({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmation') {
      setConfirmation(value);
    }
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (password === confirmation) {
        dispatch(authActions.register(email, password));
      } else {
        if (!toast.isActive(toastId.current)) {
          toast.error(ERROR_TEXT, { position: toast.POSITION.TOP_CENTER });
        }
      }
    },
    [email, password, confirmation, dispatch],
  );

  const handleClick = () => {
    history.push(routeConstants.SIGNIN);
  };

  return (
    <div className="register">
      {loading && <Loader />}
      <ToastContainer />
      <Modal text={MODAL_TEXT} value={MODAL_BTN_VALUE} onClick={handleClick}>
        <Form onChange={handleChange} onSubmit={handleSubmit}>
          <input
            className="confirmation"
            type="password"
            name="confirmation"
            placeholder="confirm password"
            onChange={handleChange}
          />
          <FormButton value={FORM_BTN_VALUE} />
        </Form>
      </Modal>
    </div>
  );
}

const mapStateToProps = ({ authReducer: { loading } }: RootSate) => {
  return { loading };
};

export default connect(mapStateToProps)(React.memo(Register));
