import React from 'react';
<<<<<<< Updated upstream
import ReactDOM from 'react-dom/client';
import './index.css';
=======
import ReactDOM from 'react-dom';
import './styles/index.scss';
>>>>>>> Stashed changes
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
<<<<<<< Updated upstream
  </React.StrictMode>
=======
  </React.StrictMode>,
  document.getElementById('root')
>>>>>>> Stashed changes
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
