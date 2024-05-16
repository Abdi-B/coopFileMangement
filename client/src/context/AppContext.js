import { createContext } from "react";

const AppContext = createContext()

export default AppContext;

// import React, { createContext, useState } from 'react';

// export const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   const [nameContext, setNameContext] = useState(true);
//   const [navbar, setNavbar] = useState(true);

//   return (
//     <AppContext.Provider value={{ nameContext, setNameContext, navbar, setNavbar }}>
//       {children}
//     </AppContext.Provider>
//   );
// };
