import { useContext, createContext, useState } from 'react';

const UtilityContext = createContext();

function UtilityContextProvider({ children }) {
  const [message, setMessage] = useState();

  const broardcastMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(() => ''), 1500);
  };

  const context = {
    message,
    broardcastMessage,
  };

  return (
    <UtilityContext.Provider value={context}>
      {children}
    </UtilityContext.Provider>
  );
}

export const useGlobalUtility = () => useContext(UtilityContext);

export default UtilityContextProvider;
