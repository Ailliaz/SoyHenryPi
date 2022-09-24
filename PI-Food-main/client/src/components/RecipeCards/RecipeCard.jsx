import React from "react";
import "./Style.css";
import { useHistory } from "react-router-dom";

export default function RecipeCard(props) {
  const history = useHistory();

  const routeChange = () => {
    let path = `/recipe/${props.recipe.id}`;
    history.push(path);
  };

  const diets = props.recipe.Diets.map((diet) => diet.name);
  return (
    <div className="cardmargin">
      <button className="card" onClick={routeChange}>
        <img src={props.recipe.image} alt="recipe" className="image" />
        <div>
          <span className="name">{props.recipe.name}</span>
        </div>
        <h3>Health Score: {props.recipe.healthScore}</h3>
        <div>
          <h3>Diets</h3>
        </div>
        <span className="columns">
          {diets.map((d) => (
            <li key={d + props.recipe.id} className="diets">
              {d}
            </li>
          ))}
        </span>
      </button>
    </div>
  );
}
