import React, { useState } from 'react';
import { authService } from 'firebase-config';

const AuthForm = () => {
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
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          value={email}
          onChange={onChange}
          name="Email"
          type="email"
          placeholder="Email"
          required
          className="authInput"
        ></input>
        <input
          value={password}
          onChange={onChange}
          name="Password"
          type="password"
          placeholder="Passowrd"
          className="authInput"
          required
        ></input>
        <input
          type="submit"
          value={newAccout ? 'SignUp' : 'SignIn'}
          className="authInput authSubmit"
        ></input>
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccout ? 'Go SignIn' : 'Create Account'}
      </span>
      {error && <span className="authError">{error}</span>}
    </>
  );
};

export default AuthForm;
