// // GlobalStateContext.js
// import React, { createContext, useContext, useState } from 'react';

// const GlobalStateContext = createContext();

// const GlobalStateProvider = ({ children }) => {
//   const [showDrawerList, setShowDrawerList] = useState(true);
//   const [showAnnouncement, setShowAnnouncement] = useState(true);

//   const toggleDrawerList = () => {
//     setShowDrawerList(false);
//   };

//   const toggleAnnouncement = () => {
//     setShowAnnouncement(false);
//   };

//   return (
//     <GlobalStateContext.Provider
//       value={{
//         toggleDrawerList,
//         toggleAnnouncement,
//       }}
//     >
//       {children}
//     </GlobalStateContext.Provider>
//   );
// };

// const useGlobalState = () => {
//   const context = useContext(GlobalStateContext);
//   if (!context) {
//     throw new Error('useGlobalState must be used within a GlobalStateProvider');
//   }
//   return context;
// };

// export { GlobalStateProvider, useGlobalState };
