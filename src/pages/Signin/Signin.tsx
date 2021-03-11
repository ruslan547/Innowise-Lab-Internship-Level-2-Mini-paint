import './Signin.scss';
import Form from '../../core/components/Form/Form';
import FormButton from '../../core/components/FormButton/FormButton';
import Modal from '../../core/components/Modal/Modal';

const FORM_BTN_VALUE = 'sign in';
const MODAL_BTN_VALUE = 'register';
const MODAL_TEXT = 'Need an account?';

function Signin(): JSX.Element {
  return (
    <div className="signin">
      <Modal text={MODAL_TEXT} value={MODAL_BTN_VALUE}>
        <Form>
          <FormButton value={FORM_BTN_VALUE} />
        </Form>
      </Modal>
    </div>
  );
}

export default Signin;
