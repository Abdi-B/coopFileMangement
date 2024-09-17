import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ element: Component, ...rest }) => {
//   const { token, setToken } = useContext(AuthContext);

//   useEffect(() => {
//     const verifyToken = async () => {
//       console.log("token in verify Token : " + token);
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
//       // setLoading(false);
//     };
//     verifyToken();
//   }, [token]);

//   console.log("token in protected route : " + token);

//   return token ? <Component {...rest} /> : <Navigate to="/login" />;
// };

const ProtectedRoute = ({element: Component, ...rest}) => {
  const { token, setToken } = useContext(AuthContext);
  const localToken = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const verifyToken = async () => {
      console.log("token not verified : " + token);
      if (localToken) {
        try {
          await axios.get("http://localhost:3001/user/protected", {
            headers: { Authorization: `Bearer ${localToken}` },
          });

          setToken(localToken); // Set the token in context if it's valid
          console.log("verified Token : " + token);

        } catch (error) {
          setToken(null);
          localStorage.removeItem("token");
        }
      }
      setIsLoading(false);
    };
    verifyToken();
  }, [localToken]);

  // console.log("token in protected route : " + token);
  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loading indicator
  }
  return token ? <Component {...rest} /> : <Navigate to="/login" />;
};


export default ProtectedRoute;
