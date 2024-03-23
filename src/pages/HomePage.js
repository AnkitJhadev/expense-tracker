import React from 'react';
import ExpenseForm from '../components/StartingPage/ExpenseForm';
import GetExpenseForm from '../components/StartingPage/GetExpenseForm';
import { useSelector } from 'react-redux'; 

const HomePage = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn); 

  return (
    <>
      {isLoggedIn && (
        <>
          <ExpenseForm />
          <GetExpenseForm />
        </>
      )}
      {!isLoggedIn && <p>Please Login First</p>}
    </>
  );
};

export default HomePage;
