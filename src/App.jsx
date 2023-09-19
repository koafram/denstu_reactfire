// Third-party
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FirestoreProvider, useFirebaseApp } from 'reactfire';
import { getFirestore } from 'firebase/firestore';

// Components
import { TodoList, About } from "./components";
 
// Styling
import './assets/css/app.css';


function App() {
  // Initialize/use Firebase
  const firebaseApp = useFirebaseApp();
  const firestoreInstance = getFirestore(firebaseApp);

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
