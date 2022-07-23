import { useEffect } from 'react';

const useWindow = (eventName: keyof WindowEventMap, callback: any) => {
  useEffect(() => {
    window.addEventListener(eventName, callback);
    return () => window.removeEventListener(eventName, callback);
  }, [eventName, callback]);
};

export default useWindow;
