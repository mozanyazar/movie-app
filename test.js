import { useState, useEffect } from "react";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";
import "./App.css";
import Home from "./Home";
function App() {
  const [capital, setCapital] = useState([]);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const button = async () => {
    const citiesRef = collection(db, "cities");

    await setDoc(doc(citiesRef, "SF"), {
      name: "San Francisco",
      state: "CA",
      country: "USA",
      capital: false,
      population: 860000,
      regions: ["west_coast", "norcal"],
    });
    await setDoc(doc(citiesRef, "LA"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA",
      capital: false,
      population: 3900000,
      regions: ["west_coast", "socal"],
    });
    await setDoc(doc(citiesRef, "DC"), {
      name: "Washington, D.C.",
      state: null,
      country: "USA",
      capital: true,
      population: 680000,
      regions: ["east_coast"],
    });
    await setDoc(doc(citiesRef, "TOK"), {
      name: "Tokyo",
      state: null,
      country: "Japan",
      capital: true,
      population: 9000000,
      regions: ["kanto", "honshu"],
    });
    await setDoc(doc(citiesRef, "BJ"), {
      name: "Beijing",
      state: null,
      country: "China",
      capital: true,
      population: 21500000,
      regions: ["jingjinji", "hebei"],
    });
  };

  const getdata = async () => {
    const docRef = doc(db, "cities", "SF");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const getMoreData = async () => {
    const q = query(collection(db, "cities"), where("country", "==", 'USA'));
    const querySnapshot = await getDocs(q);
    // getMore(querySnapshot);
    querySnapshot.forEach(async (doc) => {
      console.log(doc.id, " => ", doc.data());
      var data = doc.data();
      setCapital((prev) => [...prev, data]);
      console.log("test 1");
    });
    getMore();
  };
  const addItem = () => {
    setTodos((prev) => [...prev, text]);
  };
  return (
    <div className="App">
      <h1>hello</h1>
      <button onClick={button}>Click Here</button>
      <button onClick={getdata}>get data</button>
      <button onClick={getMoreData}>get data</button>

      <input type="text" onChange={(e) => setText(e.target.value)} />

      <button onClick={addItem}>Click</button>
      <a href="/hello">homepae</a>
      <Home capital={capital} todos={todos} />
      
    </div>
  );
}

export default App;
