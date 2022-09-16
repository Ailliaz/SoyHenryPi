import "./Style.css";
import CardsCompiler from "../RecipeCard/CardsCompiler";
import { recipe } from "../db/db";
import { useState } from "react";

function Home() {
  const [recipeState, setRecipe] = useState([]);

  recipe.then((response) => setRecipe(response));

  return (
    <div className="text">
      <input type="text" placeholder="Search..." className="search" />
      <CardsCompiler recipe={recipeState} />
    </div>
  );
}

export default Home;
