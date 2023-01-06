import { useContext, createContext, useState } from 'react';

const UtilityContext = createContext();

function UtilityContextProvider({ children }) {
  const [message, setMessage] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const broardcastMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(() => ''), 1500);
  };

  const setLogin = () => {
    setIsLoggedIn(true);
  };

  const setLogout = () => {
    setIsLoggedIn(false);
  };

  const context = {
    message,
    broardcastMessage,
    isLoggedIn,
    setLogin,
    setLogout,
  };

  return (
    <UtilityContext.Provider value={context}>
      {children}
    </UtilityContext.Provider>
  );
}

export const useGlobalUtility = () => useContext(UtilityContext);

export default UtilityContextProvider;
