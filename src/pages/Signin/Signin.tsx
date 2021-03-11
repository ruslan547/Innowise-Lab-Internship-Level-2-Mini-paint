import './Signin.scss';
import Form from '../../core/components/Form/Form';
import FormButton from '../../core/components/FormButton/FormButton';
import Modal from '../../core/components/Modal/Modal';
import { useState } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../../core/actions/auth.actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../core/components/Loader/Loader';

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

  const handleEmailChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className="signin">
      {loading && <Loader />}
      <ToastContainer />
      <Modal text={MODAL_TEXT} value={MODAL_BTN_VALUE}>
        <Form onChange={handleEmailChange} onSubmit={handleSubmit}>
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

const connectedSignin = connect(mapStateToProps)(Signin);

export default connectedSignin;
