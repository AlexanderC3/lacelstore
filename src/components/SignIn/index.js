import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  emailSignInStart,
  googleSigninStart,
} from "../../redux/User/user.actions";
import "./styles.scss";
import Buttons from "../Forms/Button";
import FormInput from "../Forms/FormInput";
import AuthWrapper from "../AuthWrapper";
import { Link, useHistory } from "react-router-dom";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/");
    }
  }, [currentUser]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSigninStart());
  };

  const configAuthWrapper = {
    headline: "Login",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={(e) => setPassword(e.target.value)}
          />

          <Buttons type="submit">Login</Buttons>
          <div className="socialSignin">
            <div className="row">
              <Buttons onClick={handleGoogleSignIn}>Signin with Google</Buttons>
            </div>
          </div>

          <div className="links">
            <Link to="/recovery">Reset password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
