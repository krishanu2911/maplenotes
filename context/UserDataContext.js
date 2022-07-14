import { createContext, useContext, useEffect, useState } from "react";
import { allUserNotes } from "../utils/firebaseService";
import { useAuth } from "./AuthContext";
const UserDataContext = createContext();
const UserDataContextProvider = ({ children }) => {
  const [userNotes, setUserNotes] = useState([]);
  const initialNoteData = {
    bgColor: "white",
    content: "",
    date: new Date().toLocaleString(),
    isArchived: false,
    isPinned: false,
    isTrashed: false,
    label: "Work",
    priority: "High",
    title: "",
  }
  const [isEditing , setIsEditing] = useState(false);
  const [oldNote , setOldNote] = useState({});
  const [userNote, setUserNote] = useState(initialNoteData);
  const { user } = useAuth();
  useEffect(() => {
    allUserNotes(user?.uid).then((data) => setUserNotes(data?.notes));
  }, []);
  return (
    <UserDataContext.Provider value={{ userNotes, setUserNotes ,userNote, setUserNote ,isEditing , setIsEditing ,oldNote , setOldNote }}>
      {children}
    </UserDataContext.Provider>
  );
};
const useUserData = () => useContext(UserDataContext);
export { UserDataContextProvider, useUserData };
