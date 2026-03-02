import { createContext, useReducer } from "react";

const ThemeContexttt = createContext();

const initialData = {
  Theme:
    localStorage.getItem("theme") === null
      ? "light"
      : localStorage.getItem("theme") === "light"
        ? "light"
        : "dark",
};

const reducer = (firstState, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...firstState, Theme: action.newValue };
    default:
      return firstState;
  }
};





export function DataProvider({ children }) {
  const [firstState, dispatch] = useReducer(reducer, initialData);
  const changeTheme = (valu) => {
    dispatch({ type: "CHANGE_THEME", newValue: valu });
  };


  
  return (
    <ThemeContexttt.Provider value={{ ...firstState, changeTheme }}>
      {children}
    </ThemeContexttt.Provider>
  );
}

export default ThemeContexttt;
