import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const useAuthContext = () => {
//   const context = useContext(AuthContext)

//   if (!context) {
//       throw Error('useAuthContext must be used inside an AuthContextProvider')
//   }

//   // console.log('its content ', context);

//   return context
// }

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const verifyToken = async () => {
//       // console.log("token in verify Token : " + token);
//       if (token) {
//         try {
//           await axios.get("http://localhost:3001/user/protected", {
//             headers: { Authorization: `Bearer ${token}` },
//           });

//           console.log("token in verify Token : " + token);
//         } catch (error) {
//           setToken(null);
//           localStorage.removeItem("token");
//         }
//       }
//       setLoading(false);
//     };
//     verifyToken();
//   }, [token]);

//   const login = (token1) => {
//     setToken(token1);
//     localStorage.setItem("token", token1);
//   };

//   const logout = () => {
//     setToken(null);
//     localStorage.removeItem("token");
//   };

//   return (
//     // <AuthContext.Provider value={{ token, login, logout }}>
//     <AuthContext >
//       {console.log(" token in context  :" + token)}
//       {!loading && children}
//     </AuthContext>
//     // </AuthContext.Provider>
//   );
// };
