import React from "react";
import "./Style.css";

export default function RecipeCard(props) {
  const diets = props.recipe.Diets.map((diet) => diet.name);
  return (
    <div className="cardmargin">
      <button className="card">
        <img src={props.recipe.image} alt="recipe" class="image" />
        <div>
          {/* <p>{props.recipe.id} </p> */}
          <span className="name">
            <strong>Name:</strong> {props.recipe.name}
          </span>
        </div>
        <div>
          <h3>Diets</h3>
        </div>
        <span className="columns">
          {diets.map((d) => (
            <li class="diets" key={props.id}>
              {d}
            </li>
          ))}
        </span>
      </button>
    </div>
  );
}
