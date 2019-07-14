import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { message } from 'antd';
import 'antd/dist/antd.css';

import App from './app';
import * as serviceWorker from './serviceWorker';
import RootStore from './stores';

configure({ enforceActions: 'always' });

// Pass in deps here...
const store = new RootStore({ message });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
