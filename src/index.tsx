import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SecureRouteProvider } from './Context/SecureRoute';

import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <SecureRouteProvider>
      <App />
    </SecureRouteProvider>
  </React.StrictMode>
);

// Report Web Vitals to console (or send to an analytics endpoint)
reportWebVitals(console.log);


