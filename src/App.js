import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserContextProvider from "./contexts/UserContext";

import Login from "./pages/login";
import Register from "./pages/register";
import AllMovies from "./pages/allMovies";
import AddMovie from "./pages/addMovie";
import EditMovie from "./pages/editMovie"

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <BrowserRouter>
        <UserContextProvider>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" exact component={Register} />
            <Route exact path="/allMovies" component={AllMovies} />
            <Route exact path="/addMovie" component={AddMovie} />
            <Route exact path="/editMovie/:id" component={EditMovie} />
          </Switch>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
