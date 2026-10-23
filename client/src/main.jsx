import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { store } from './store/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
          <Toaster position="top-right" toastOptions={{ duration: 4000, style: { background: '#11191D', color: '#fff', border: '1px solid #D99A32' } }} />
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
