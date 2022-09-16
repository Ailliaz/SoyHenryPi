import React from "react";
import "./Style.css";
const cookingImage = require("../img/cooking.png").default;

export default function Nav() {
  return (
    <div class="navbar">
      <a href="/home">Home</a>
      <a href="/create">Create Recipe</a>
      <div class="title">
        <h1>Henry Food</h1>
      </div>
      <img className="img" src={cookingImage} alt="icon" />
    </div>
  );
}
