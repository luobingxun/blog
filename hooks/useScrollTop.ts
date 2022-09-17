import { useEffect, useState } from 'react';

const useScrollTop = (instance = 0) => {
  const [isHeaderScrollTop, setIsHeaderScrollTop] = useState(true);

  const onScroll = () => {
    setIsHeaderScrollTop(window.scrollY === instance);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { isHeaderScrollTop };
};

export default useScrollTop;
