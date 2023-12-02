import { createContext, useState } from "react";

const AppContext = createContext({
  theme: "light",
  setTheme: () => {},
});

const AppProvider = ({ value, children }) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
