import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../config/firebase.js";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  query,
  getDoc,
  arrayRemove,
} from "firebase/firestore";
import { useUserData } from "../context/UserDataContext";
const signUpNewUser = async (email, fullName, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    storeUserToDb(fullName, email, password, res.user.uid);
  } catch (err) {
    console.log(err);
  }
};
const loginUser = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
  }
};
const storeUserToDb = async (fullName, email, password, userId) => {
  try {
    await setDoc(doc(db, "users", userId), {
      fullName,
      email,
      password,
      notes: [],
    });
  } catch (err) {
    console.log(err);
  }
};
const addNote = async (noteData, userId) => {
  console.log("calling add note function");
  try {
    await updateDoc(doc(db, "users", userId), {
      notes: arrayUnion({ ...noteData }),
    });
    console.log("added note");
  } catch (err) {
    console.log(err);
  }
};
const editNoteColor = async (noteData, colorName, userId) => {
  console.log("editing color");
  try {
    await updateDoc(doc(db, "users", userId), {
      notes: arrayUnion({ ...noteData, bgColor: colorName }),
    });
    await updateDoc(doc(db, "users", userId), {
      notes: arrayRemove({ ...noteData }),
    });
  } catch (err) {
    console.log(err);
  }
};
const allUserNotes = async (userId) => {
  try {
    const userData = await getDoc(doc(db, "users", userId));
    return userData.data();
  } catch (err) {
    console.log(err);
  }
};
export {
  signUpNewUser,
  storeUserToDb,
  loginUser,
  addNote,
  allUserNotes,
  editNoteColor,
};
