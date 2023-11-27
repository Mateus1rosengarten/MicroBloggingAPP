import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import AddContext, { TweetsAddContext } from './context/contextAdd';

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
  <AddContext> 
    <App />
    </AddContext>
    </BrowserRouter>
  // </React.StrictMode>
);

reportWebVitals();
