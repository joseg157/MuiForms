import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@setup/AppContextManager';
import '@assets/css/main.css';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
