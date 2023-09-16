// Third-party
// import { useState, useEffect } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import { TodoList, About } from "./components";
// import { About } from "./components";
 
// Utils
import { API_SERVER, API_TODOS, LANGUAGE } from "./utils/constants";

// Styling
import './assets/css/app.css'

function App() {
  const [userInfo, setUserInfo] = useState([]);

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
    <div className="todo-app">
      <Router>
        <Routes>
          <Route path="/" exact Component={TodoList} />
          <Route path="/about" Component={About} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
