import App from './App.tsx';
import { Tooltip } from 'opub-ui';
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../assets/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Tooltip.Provider>
      <App />
    </Tooltip.Provider>
  </React.StrictMode>
);
