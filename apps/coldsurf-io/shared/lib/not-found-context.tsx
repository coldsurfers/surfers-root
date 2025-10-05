'use client';

import { type PropsWithChildren, createContext, useContext, useState } from 'react';

export const NotFoundContext = createContext<{
  isNotFound: boolean;
  setIsNotFound: (isNotFound: boolean) => void;
}>({
  isNotFound: false,
  setIsNotFound: () => {},
});
export const useNotFoundContext = () => useContext(NotFoundContext);

export const NotFoundContextProvider = ({ children }: PropsWithChildren) => {
  const [isNotFound, setIsNotFound] = useState(false);
  return (
    <NotFoundContext.Provider
      value={{
        isNotFound,
        setIsNotFound: (isNotFoundParam) => {
          setIsNotFound(isNotFoundParam);
        },
      }}
    >
      {children}
    </NotFoundContext.Provider>
  );
};
