import '@ant-design/v5-patch-for-react-19';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './sass/index.scss';
import 'antd/dist/reset.css';
import App from './App';
import './i18n';
import { persistor, store } from 'src/store';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
