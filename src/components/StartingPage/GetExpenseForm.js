// GetExpenseForm.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/auth-context';

const GetExpenseForm = () => {
  const [expenses, setExpenses] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://react-auth-with-9cd6e-default-rtdb.firebaseio.com/expenses/${authContext.userId}.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }
        const data = await response.json();

        const expensesArray = [];
        for (const key in data) {
          expensesArray.push({
            id: key,
            ...data[key],
          });
        }

        setExpenses(expensesArray);
      } catch (error) {
        console.error('Failed to fetch expenses:', error);
      }
    };

    fetchData();
  }, [authContext.userId, expenses]);

  const deleteExpenseHandler = async (id) => {
    try {
      const response = await fetch(`https://react-auth-with-9cd6e-default-rtdb.firebaseio.com/expenses/${authContext.userId}/${id}.json`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }

      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error('Failed to delete expense:', error);
    }
  };

  return (
    <section>
      <h2>Expenses</h2>
      <div>
        {expenses.map((expense) => (
          <div key={expense.id}>
            <p>Amount: ${expense.amount}</p>
            <p>Description: {expense.description}</p>
            <p>Date: {expense.date}</p>
            <p>Category: {expense.category}</p>
            <button onClick={() => deleteExpenseHandler(expense.id)}>Delete</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GetExpenseForm;
