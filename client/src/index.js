import React from 'react';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import stores from './stores';
import App from './components/app/App';
import './index.css';

render((
    <BrowserRouter>
        <Provider items={stores.items}>
            <App/>
        </Provider>
    </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
