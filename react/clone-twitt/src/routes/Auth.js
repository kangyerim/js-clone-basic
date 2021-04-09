import React, { useState } from 'react';
import { authService, firebaseInstance } from 'firebase-config';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccout, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'Email') setEmail(value);
    if (name === 'Password') setPassword(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccout) {
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };
  const toggleAccount = () => setNewAccount((pre) => !pre);
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
      <form onSubmit={onSubmit}>
        <input
          value={email}
          onChange={onChange}
          name="Email"
          type="email"
          placeholder="Email"
          required
        ></input>
        <input
          value={password}
          onChange={onChange}
          name="Password"
          type="password"
          placeholder="Passowrd"
          required
        ></input>
        <input type="submit" value={newAccout ? 'SignUp' : 'SignIn'}></input>
      </form>
      <span onClick={toggleAccount}>
        {newAccout ? 'Go SignIn' : 'Create Account'}
      </span>
      {error}
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
