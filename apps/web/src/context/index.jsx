import React from "react";

const initialState = {
  user: undefined,
  shouldHideSidebar: false,
  settings: {
    theme: "light",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "TOGGLE_SIDEBAR":
      return { ...state, shouldHideSidebar: action.payload };
    case "SET_THEME":
      return {
        ...state,
        settings: { ...state.settings, theme: action.payload },
      };
    case "ADD_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export const StoreContext = React.createContext({
  state: initialState,
  dispatch: () => null,
});

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
