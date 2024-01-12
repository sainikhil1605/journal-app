import { createContext, useState } from "react";

const AppContext = createContext({
  theme: "light",
  setTheme: () => {},
  journals: [],
  setJournals: () => {},  
});

const AppProvider = ({ value, children }) => {
  const [journals, setJournals] = useState([]);
  return <AppContext.Provider value={{...value,journals,setJournals}}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
