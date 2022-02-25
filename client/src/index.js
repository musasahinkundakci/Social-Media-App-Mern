import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/root/App';
import {configureStore} from './redux/reducers/configureStore';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';


const store = configureStore();
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
