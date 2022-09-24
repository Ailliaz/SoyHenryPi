import React from "react";
import RecipeCard from "./RecipeCard";
import "./Style.css";

export default function CardsCompiler(recipes) {
  return (
    <div className="box">
      {recipes.recipe.map((recipe) => (
        <RecipeCard key={recipe.name} recipe={recipe} />
      ))}
    </div>
  );
}
