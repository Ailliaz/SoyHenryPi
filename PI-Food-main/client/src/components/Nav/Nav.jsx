import React from "react";
import { Link } from "react-router-dom";
import "./Style.css";

export default function Nav() {
  return (
    <div className="nav">
      <img src="/img/cooking.png" alt="icon" />
      <h1>Henry Food</h1>
      <button class="dropbtn">
        <strong>///</strong>
      </button>
      <div class="dropdown-content">
        <a href="/home">Home</a>
      </div>
    </div>
  );
}
