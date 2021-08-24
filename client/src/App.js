import TopBar from "./components/topbar/TopBar"
import Home from "./pages/home/Home"
import Single from "./pages/single/single"
import Write from "./pages/write/Write"
import Settings from "./pages/settings/Setting"
import './index.css'
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react"
import { Context } from "./context/Context"

function App() {
  const {user} = useContext(Context);

  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">
          {user ? <Home /> : <Login />}
        </Route>
        <Route path="/write">
          {user ? <Write /> : <Register />}
        </Route>
        <Route path="/settings">
          {user ? <Settings /> : <Register />}
        </Route>
        <Route path="/post/:postId">
          <Single />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
