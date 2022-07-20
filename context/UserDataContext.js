import { createContext, useContext, useEffect, useState , useReducer } from "react";
import { allUserNotes } from "../utils/firebaseService";
import { useAuth } from "./AuthContext";
import {dateFilter , priorityFilter , labelFilter , Compose} from "./Utils";
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
  const initialData = {
    sortByPriority: "",
    sortByDate: "",
    labels: [],
  };
  const filterReducer = (state, action) => {
    switch (action.type) {
      case "FILTER_BY_LABEL":
        const newLabel = state.labels.includes(action.payload)
          ? state.labels.filter((item) => item !== action.payload)
          : [...state.labels, action.payload];
        return { ...state, labels: newLabel };
      case "SORT_BY_PRIORITY":
        return { ...state, sortByPriority: action.payload };
      case "SORT_BY_DATE":
        return { ...state, sortByDate: action.payload };
  
      case "CLEAR_FILTER":
        return {
          sortByPriority: "",
          sortByDate: "",
          labels: [],
        };
      default:
        return state;
    }
  };
  const [filterState, filterDispatch] = useReducer(filterReducer, initialData);

  const filteredNotes = Compose(
    filterState,
    labelFilter,
    priorityFilter,
    dateFilter
  )(userNotes);
  console.log(filteredNotes);
  useEffect(() => {
  },[filterState])
  useEffect(() => {
    allUserNotes(user?.uid).then((data) => setUserNotes(data?.notes));
  }, []);
  return (
    <UserDataContext.Provider value={{filteredNotes, userNotes, setUserNotes ,userNote, setUserNote ,isEditing , setIsEditing ,oldNote , setOldNote ,filterState, filterDispatch }}>
      {children}
    </UserDataContext.Provider>
  );
};
const useUserData = () => useContext(UserDataContext);
export { UserDataContextProvider, useUserData };
