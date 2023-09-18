// Third-party
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FirestoreProvider, useFirebaseApp } from 'reactfire';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';

// Components
import { TodoList, About } from "./components";
 
// Styling
import './assets/css/app.css';

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
//// const auth = firebase.auth();
// const auth = getAuth(app);

function App() {
  const firebaseApp = useFirebaseApp();
  const firestoreInstance = getFirestore(firebaseApp);

  const [userInfo, setUserInfo] = useState([]);

  // const [user] = useAuth(auth);

  // Fetch authenticated user's todos
  // const fetchUserInfo = async () => {
  //   const res = await fetch(API_SERVER + API_TODOS);
  //   const data = await res.json();

  //   return data;
  // };

  //
  // const getCustInfo = async () => {
  //   const db_userInfo = await fetchUserInfo();
  //   setUserInfo(db_userInfo);
  // };

  /**
   * Updates the app's language
   * @param string newLanguage
   */
  const changeLanguage = (newLanguage) => {
    // setLanguage({ language: newLanguage });
  };

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <div className="todo-app">
        <Router>
          <Routes>
            <Route path="/" exact Component={TodoList} />
            <Route path="/about" Component={About} />
          </Routes>
        </Router>
      </div>
    </FirestoreProvider>
  );
}

export default App
