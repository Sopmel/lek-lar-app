import React from 'react';
import { InversifyProvider } from "../src/di/inversifyProvider";
import { container } from './di/inversify.config';
import "reflect-metadata";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <InversifyProvider container={container}>
        <App />
      </InversifyProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
