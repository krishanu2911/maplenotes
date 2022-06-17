import { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(user);
  // const [userToken, setUserToker] = useState(false)
  // useEffect(() => {
  //     // Perform localStorage action
  //     const item = localStorage.getItem('key')
  //   }, [])

  // const userToken = typeof window !== 'undefined' ? localStorage.getItem("userToken") : null
  // console.log(userToken, "context")
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // console.log(user, "authstate")
      if (user) {
        // const userToken = typeof window !== 'undefined' ? localStorage.getItem("userToken") : null
        setLoading(false);
        setUser({
          uid: user.uid,
          email: user.email,
          token: user.uid,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  // const userToken = null;
  // if (typeof window !== 'undefined') {
  //     const userToken = localStorage.getItem('UserToken')
  //     setUserToker(localStorage.getItem("UserToken"));
  //   }
  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
const useAuth = () => useContext(AuthContext);
export { AuthContextProvider, useAuth };
