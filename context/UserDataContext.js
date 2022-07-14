import { createContext, useContext, useEffect, useState } from "react";
import { allUserNotes } from "../utils/firebaseService";
import { useAuth } from "./AuthContext";
const UserDataContext = createContext();
const UserDataContextProvider = ({ children }) => {
  const [userNotes, setUserNotes] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    allUserNotes(user?.uid).then((data) => setUserNotes(data?.notes));
  }, []);
  return (
    <UserDataContext.Provider value={{ userNotes, setUserNotes }}>
      {children}
    </UserDataContext.Provider>
  );
};
const useUserData = () => useContext(UserDataContext);
export { UserDataContextProvider, useUserData };
