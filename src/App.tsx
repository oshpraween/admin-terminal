import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './App.css';
import { routes } from './routes';
import { ThemeProvider } from './theme/theme-provider';
import { useConnectionStatusEvents } from './hooks/use-connection-status-events';
import { initializeOms } from 'src/store/reducer/oms-api/thunks/initialize-oms.thunk';
import { AppDispatch } from './store'; // <-- add this import
import React from 'react';
import { BrowserRouter } from 'react-router';
import { AliveScope } from 'react-activation';

function RoutesRenderer() {
  return useRoutes(routes);
}

function App() {
  useConnectionStatusEvents();

  const dispatch = useDispatch<AppDispatch>(); // <-- type the dispatch

  useEffect(() => {
    dispatch(initializeOms());
  }, [dispatch]);

  return (
    <AliveScope>
      <BrowserRouter>
        <ThemeProvider>
          <RoutesRenderer />
        </ThemeProvider>
      </BrowserRouter>
    </AliveScope>
  );
}

export default App;
