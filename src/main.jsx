


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ItemProvider } from './assets/ItemContext'; // Adjust the path as needed

ReactDOM.render(
  <ItemProvider>
    <App />
  </ItemProvider>,
  document.getElementById('root')
);
