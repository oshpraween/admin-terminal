import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setConnectionStatus } from 'src/store/reducer/connection-status.slice';

export function useConnectionStatusEvents() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOnline = () => dispatch(setConnectionStatus(true));
    const handleOffline = () => dispatch(setConnectionStatus(false));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Set initial state
    dispatch(setConnectionStatus(navigator.onLine));

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [dispatch]);
}
