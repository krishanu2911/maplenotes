import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../config/firebase.js";
import { doc, setDoc } from "firebase/firestore";
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
export { signUpNewUser, storeUserToDb, loginUser };
