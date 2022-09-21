import React, { useState, useEffect } from "react";
import axios from "axios";
import store from "../../redux/store";

import "./Style.css";

export default function DetailsCard() {
  const [details, setDetails] = useState({ Diets: [{ name: "" }] });
  const [steps, setSteps] = useState({
    steps: [],
    ingredients: [],
    equipment: [],
  });

  useEffect(() => {
    const state = store.getState();
    if (!isNaN(state / 1)) {
      const fetchPost = async () => {
        const res = await axios.get(
          `http://localhost:3001/recipes/${state}?summary=summary&steps=steps&healthScore=healthScore&image=image`
        );
        setDetails(res.data);
      };
      fetchPost();
    } else {
      const fetchPost = async () => {
        const url = window.location.href.substring(
          window.location.href.lastIndexOf("/") + 1
        );
        const res = await axios.get(
          `http://localhost:3001/recipes/${url}?summary=summary&steps=steps&healthScore=healthScore&image=image`
        );
        setDetails(res.data);
      };
      fetchPost();
    }
  }, []);

  // useEffect(() => {
  //   const setVariables = async () => {
  //     const responseSteps = details.steps;
  //     const jsonSteps = JSON.parse(responseSteps);
  //     setSteps(jsonSteps);
  //   };
  //   setVariables();
  // }, [details]);
  console.log(details.name);
  if (details.name === undefined)
    return (
      <div className="cardDetails">
        <span className="noId">
          <strong>There is no recipe with this id</strong>
        </span>
      </div>
    );
  else {
    return (
      <div className="boxDetails">
        <div className="cardDetails">
          <span className="detailsName">
            <strong>{details.name}</strong>
          </span>
          <img className="detailsImage" src={details.image} alt="recipe" />
          <div>
            <span className="title">
              <strong>Summary</strong>
            </span>
            <span className="detailsSummary">{details.summary}</span>
          </div>
          <span className="title">
            <strong>Step by step</strong>
          </span>
          <span></span>
          <span>Ingredients:</span>
          <span>Equipment:</span>
          <div className="title">
            <h3>Diets</h3>
          </div>
          <span className="detailsColumns">
            {details.Diets.map((d) => (
              <li key={d.name} className="detailsDiets">
                {d.name}
              </li>
            ))}
          </span>
        </div>
      </div>
    );
  }
}
