import React from 'react';
import { createRoot } from 'react-dom/client';  // Ensure you're importing createRoot from react-dom/client
import App from './App';
import './index.css'

const container = document.getElementById('root');
const root = createRoot(container);  // Now use createRoot instead of ReactDOM.render

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
