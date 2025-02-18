import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SecureRouteProvider } from './Context/SecureRoute';
import { Provider } from 'react-redux';

import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './Store/Store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <SecureRouteProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SecureRouteProvider>
  </React.StrictMode>
);

// Report Web Vitals to console (or send to an analytics endpoint)
reportWebVitals(console.log);


