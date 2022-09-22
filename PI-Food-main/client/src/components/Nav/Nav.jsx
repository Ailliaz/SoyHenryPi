import React from "react";
import "./Style.css";
const cookingImage = require("../img/soy-henry-logo.jpg").default;

export default function Nav() {
  return (
    <div className="navbar">
      <a href="/home">Home</a>
      <a href="/create">Create Recipe</a>
      <div className="titleHenry">
        <h1>Henry Food</h1>
      </div>
      <img className="img" src={cookingImage} alt="icon" />
    </div>
  );
}
