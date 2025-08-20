import { useEffect, useRef, useState } from 'react';

const useDebouncedValue = (input: string = '', time = 500) => {
  const [debouncedValue, setDebouncedValue] = useState('');
  const setDebouncedValueRef = useRef(setDebouncedValue);
  useEffect(() => {
    console.log('render');
    const timeout = setTimeout(() => {
      setDebouncedValueRef.current(input);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [input, time]);

  return debouncedValue;
};

export default useDebouncedValue;
