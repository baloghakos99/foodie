import "./css/App.css";

import Home from "./components/Home";
import Detail from "./components/Detail";
import Dishes from "./components/Dishes";
import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export let NavContext = React.createContext("");
export let TitleContext = React.createContext("");

export default function App() {
  const [navContext, setContext] = useState(
    JSON.parse(localStorage.getItem("context"))
  );
  const [title, setTitle] = useState("");
  const [toggle, setToggle] = useState(false);

  const valami = () => {
    console.log("aaaaaa");
    if (!toggle) {
      setToggle(true);
    } else {
      setToggle(false);
    }
    console.log(toggle);
  };

  const setNavContext = (selectedNav, title) => {
    setContext(selectedNav);
    localStorage.setItem("nav", selectedNav);

    localStorage.setItem("foodType", "Select cuisine type");
    localStorage.setItem("mealTime", "Select meal time");
    localStorage.setItem("lastFetch", "");

    setTitle(title);
  };

  return (
    <Router>
      <div className="main-container">
        <NavContext.Provider value={navContext}>
          <TitleContext.Provider value={title}>
            <nav className="navbar">
              <div className="title">
                {" "}
                <a className="navbar-title" href="/">
                  Foodie
                </a>
              </div>
              <a href="#" class="toggle-button" onClick={() => valami()}>
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
              </a>
              <div className={toggle ? "navbar-links-active" : "navbar-links"}>
                <ul>
                  <li>
                    <a
                      onClick={() => setNavContext("Starter", "Starters")}
                      className="nav-link"
                      href="/starters"
                    >
                      Starters
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => setNavContext("Soup", "Soups")}
                      className="nav-link"
                      href="/soups"
                    >
                      Soups
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        setNavContext("Main%20course", "Main courses")
                      }
                      className="nav-link"
                      href="/main-courses"
                    >
                      Main courses
                    </a>
                  </li>

                  <li>
                    <a
                      onClick={() => setNavContext("Desserts", "Desserts")}
                      className="nav-link"
                      href="/desserts"
                    >
                      Desserts
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => setNavContext("Drinks", "Drinks")}
                      className="nav-link"
                      href="/drinks"
                    >
                      Drinks
                    </a>
                  </li>
                </ul>
              </div>
            </nav>

            <>
              <Switch>
                <Route
                  path="/recipe/:ID"
                  render={(props) => <Detail {...props} />}
                />

                <Route
                  path="/soups/:ID"
                  render={(props) => <Detail {...props} />}
                />

                <Route
                  path="/main-courses/:ID"
                  render={(props) => <Detail {...props} />}
                />

                <Route
                  path="/desserts/:ID"
                  render={(props) => <Detail {...props} />}
                />

                <Route
                  path="/drinks/:ID"
                  render={(props) => <Detail {...props} />}
                />

                <Route path="/starters">
                  <Dishes />
                </Route>

                <Route path="/soups">
                  <Dishes />
                </Route>

                <Route path="/main-courses">
                  <Dishes />
                </Route>

                <Route path="/desserts">
                  <Dishes />
                </Route>

                <Route path="/drinks">
                  <Dishes />
                </Route>

                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </>
          </TitleContext.Provider>
        </NavContext.Provider>
      </div>
    </Router>
  );
}
