import { useState } from 'react';
import AppContext from './AppContext';

function ContextProvider({ children }) {
  const [desktopHelperToggle, setDesktopHelperToggle] = useState(false);
  const [mobileHelperToggle, setMobileHelperToggle] = useState(false);

//   const token = process.env.API_SECRET;

  const context = {
    token, desktopHelperToggle, setDesktopHelperToggle, mobileHelperToggle, setMobileHelperToggle,
  };

  return (
    <AppContext.Provider value={context}>{children}</AppContext.Provider>
  );
}

export { AppContext, ContextProvider as Provider };
