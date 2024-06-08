import React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/js/app';
import './app/scss/style.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
