import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const UserContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [watchList, setWatchList] = useState(null);
  const [watchedList, setWatchedList] = useState(null);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState({
    message: undefined,
    isSucces: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const WatchListSnapShot = doc(db, "watchList", user.uid);
        const WatchedListSnapShot = doc(db, "watchedList", user.uid);
        const docSnap = await getDoc(WatchListSnapShot);
        if (docSnap.exists()) {
          console.log(docSnap.data().watchList);
          setWatchList(docSnap.data().watchList);
        }
        const docSnap2 = await getDoc(WatchedListSnapShot);
        if (docSnap2.exists()) {
          console.log(docSnap2.data().watchedList);
          setWatchedList(docSnap2.data().watchedList);
        }
      } else {
        setWatchList([]);
        setWatchedList([]);
        console.log(watchList);
        console.log(watchedList);
        setUser(null);
      }
    });
  }, []);

  const updateProfileSignIn = (name) =>
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });

  const creatingDbCollections = async (user, email, name) => {
    const ref = doc(db, "users", user.uid);
    const docRef = await setDoc(ref, {
      isAdmin: false,
      email,
      name,
      created: Timestamp.now(),
    });
    setDoc(doc(db, "watchList", user.uid), {
      watchList: [],
    });
    setDoc(doc(db, "watchedList", user.uid), {
      watchedList: [],
    });
  };

  const createUser = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        creatingDbCollections(userCredential.user, email, name);
        setMessage({
          message: "profile created !",
          isSucces: true,
        });
        updateProfileSignIn(name);
      })
      .catch((error) => {
        setMessage({
          message: error.message,
          isSucces: false,
        });
      });
  };

  const SignInWithEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        setMessage({
          message: "successful !",
          isSucces: true,
        });
        navigate("/");
      })
      .catch((error) => {
        setMessage({
          message: error.message,
          isSucces: false,
        });
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setMessage({
          message: "Logout successful !",
          isSucces: true,
        });
      })
      .catch((error) => {
        setMessage({
          message: error.message,
          isSucces: false,
        });
      });
  };

  const values = {
    createUser,
    logout,
    SignInWithEmail,
    message,
    setMessage,
    user,
    setUser,
    setWatchList,
    watchList,
    watchedList,
    setWatchedList,
  };
  return (
    <UserContext.Provider value={{ ...values }}>
      {children}
    </UserContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(UserContext);
};
