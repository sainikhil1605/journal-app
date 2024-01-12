import { createContext, useState } from "react";

const AppContext = createContext({
  theme: "light",
  setTheme: () => {},
  journals: [],
  setJournals: () => {},
  location: null,
  setLocation: () => {},
});

const AppProvider = ({ value, children }) => {
  const [journals, setJournals] = useState([]);
  const [location, setLocation] = useState(null);
  return (
    <AppContext.Provider
      value={{ ...value, journals, setJournals, location, setLocation }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
