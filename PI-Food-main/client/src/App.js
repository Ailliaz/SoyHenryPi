import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CardsCompiler from "./components/RecipeCard/CardsCompiler";
import { recipe } from "./components/db/db";
import { useState } from "react";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";

function App() {
  const [recipeState, setRecipe] = useState([]);

  recipe.then((response) => setRecipe(response));

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
