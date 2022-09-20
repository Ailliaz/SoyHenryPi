import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav/Nav";

//Components
import Home from "./components/Home/Home";
import CreateRecipe from "./components/RecipeCreator/RecipeCreator";
import LandingPage from "./components/Landing/Landing";
import RecipeDetails from "./components/RecipeDetail/RecipeDetail";
import NoMatch from "./components/NoMatch/Nomatch";

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
          <Route path="/recipe/:id">
            <RecipeDetails />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
