import React from "react";
import { useState } from "react";
import { details } from "../db/db";
import "./Style.css";

export default function CardsCompiler(recipes) {
  const [detailState, setDetail] = useState([]);

  details.then((response) => setDetail(response));
  console.log(detailState);

  return (
    <div className="boxDetails">
      <div className="cardDetails">
        <img src="" alt="recipe" className="image" />
        <div>
          <p>ID: </p>
          <div>
            <strong>Summary:</strong>
          </div>
          <span className="name">
            <strong>Name:</strong>
          </span>
        </div>
        <span>
          <strong>Step by step</strong>
        </span>
        <span>Steps:</span>
        <span>Ingredients:</span>
        <span>Equipment:</span>
        <div>
          <h3>Diets</h3>
        </div>
        <span className="columns">
          {/* {.map((d) => ( */}
          <li className="diets"></li>
          {/* ))} */}
        </span>
      </div>
    </div>
  );
}
