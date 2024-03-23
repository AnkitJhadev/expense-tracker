// AuthForm.js
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../store/authSlice';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const inputEmailRefHandler = useRef();
  const inputPasswordHandler = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = inputEmailRefHandler.current.value;
    const enteredPassword = inputPasswordHandler.current.value;

    let url = '';
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCeTfUFWlHTzRKCxr3Ak4xB6RLW1-rhBpA';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCeTfUFWlHTzRKCxr3Ak4xB6RLW1-rhBpA';
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Authentication failed!');
      }

      const data = await response.json();
      dispatch(login({ token: data.idToken, email: enteredEmail })); // Use email instead of userId
      localStorage.setItem('isLoggedIn', 'true');
      history.replace('/');
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={inputEmailRefHandler} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={inputPasswordHandler} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Signup'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
