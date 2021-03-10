function Signin(): JSX.Element {
  return (
    <div className="signin-page">
      <div className="signin-modal">
        <form className="signin-form">
          <input className="signin-form__email" />
          <input className="signin-form__password" />
          <input className="signin-form__btn" type="submin" value={'SIGN IN'} />
        </form>
        <div className="signin-modal__footer">
          Need an account?
          <button className="sinin-modal__btn">REGISTER</button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
