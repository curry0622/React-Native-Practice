import { useEffect } from 'react';

const useLogger = (state) => {
  useEffect(() => {
    console.log(state);
  }, [state]);
};

export default useLogger;
