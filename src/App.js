// AppRoutes.js
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useSelector } from 'react-redux'; // Import useSelector

const AppRoutes = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          {isLoggedIn ? <HomePage /> : <Redirect to="/auth" />}
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Route path='/profile'>
          <UserProfile />
        </Route>
      </Switch>
    </Layout>
  );
};

export default AppRoutes;
