import { useEffect } from 'react';
import useTimeout from '@sjblurton/use-timeout';

const useDebounce = (callback: any, delay: number, dependencies: any[]) => {
  const { clear, reset } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []); //eslint-disable-line
};

export default useDebounce;
