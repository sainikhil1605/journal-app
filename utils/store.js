import { createContext, useState } from "react";

const AppContext = createContext({
  theme: "light",
  setTheme: () => {},
  journals: [],
  setJournals: () => {},
  location: null,
  setLocation: () => {},
  latAndLong: null,
  setLatAndLong: () => {},
});

const AppProvider = ({ value, children }) => {
  const [journals, setJournals] = useState([]);
  const [location, setLocation] = useState(null);
  const [latAndLong, setLatAndLong] = useState(null);
  return (
    <AppContext.Provider
      value={{
        ...value,
        journals,
        setJournals,
        location,
        setLocation,
        latAndLong,
        setLatAndLong,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
