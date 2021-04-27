import React from 'react';
import { authService, firebaseInstance } from 'firebase-config';
import AuthForm from 'components/AuthForm';

const Auth = () => {
  const onSocialLogin = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    try {
      await authService.signInWithPopup(provider);
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div>
      <AuthForm></AuthForm>
      <div>
        <button onClick={onSocialLogin} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialLogin} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
