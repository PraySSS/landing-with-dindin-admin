import React, { useEffect, useState, Fragment } from "react";
import "./App.css";
import NavBar from "./layouts/NavBar";
import Login from "./authentication/Login";
import Place from "./screens/Place";
import Feedback from "./screens/Feedback";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  const [user, setUser] = useState("");
  const [toggleForm, setToggleForm] = useState(true);
  const formMode = () => {
    setToggleForm(!toggleForm);
  };
  const userState = () => {
    const data = localStorage.getItem("user");
    const us = data !== null ? JSON.parse(data) : null;
    setUser(us);
  };

  useEffect(() => {
    userState();
  }, []);
  return (
    <>
      {user !== null ? (
        <>
          <Router>
            <Fragment>
              <NavBar setUserState={() => setUser(null)} />
              <Routes>
                <Route exact path="/Place" element={<Place />}></Route>
              
                <Route path="/Feedback" element={<Feedback />}></Route>
              </Routes>
            </Fragment>
          </Router>
        </>
      ) : (
        <>
          <Login loggedIn={(user) => setUser(user)} toggle={() => formMode()} />
        </>
      )}
    </>
  );
}

export default App;
