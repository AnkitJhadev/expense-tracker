import React from 'react';
import { createRoot } from 'react-dom'; // Correct import statement
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import store from './store/main';
import { Provider } from 'react-redux';
import { AuthContextProvider } from './Context/auth-context';

const root = createRoot(document.getElementById('root')); // Use createRoot from react-dom
root.render(
  <Provider store={store}>
    <AuthContextProvider>

    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AuthContextProvider>

  </Provider>
);
