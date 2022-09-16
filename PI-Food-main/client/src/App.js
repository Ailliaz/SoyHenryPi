import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav/Nav";

//Components
import Home from "./components/Home/Home";
import CreateRecipe from "./components/RecipeCreator/RecipeCreator";
import LandingPage from "./components/Landing/Landing";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {window.location.href !== "http://localhost:3000/" && <Nav />}
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/create">
            <CreateRecipe />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
