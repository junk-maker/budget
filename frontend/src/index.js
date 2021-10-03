import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);


reportWebVitals();
