import App from './App';
import React from 'react';
import store from './redux';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
