import React, { useState, useEffect } from "react";
import axios from "axios";
import store from "../../redux/store";

import "./Style.css";

export default function DetailsCard() {
  const [details, setDetails] = useState({
    Diets: [{ name: "" }],
    steps: '{"steps":[]}',
  });
  const [steps, setSteps] = useState({
    steps: [""],
    ingredients: [],
    equipment: [],
  });

  useEffect(() => {
    const state = store.getState();
    if (!isNaN(state / 1)) {
      const fetchPost = async () => {
        const res = await axios.get(
          `http://localhost:3001/recipes/${state}?summary=summary&steps=steps&healthScore=healthScore&image=image&dishTypes=dishTypes`
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
          `http://localhost:3001/recipes/${url}?summary=summary&steps=steps&healthScore=healthScore&image=image&dishTypes=dishTypes`
        );
        setDetails(res.data);
      };
      fetchPost();
    }
  }, []);

  useEffect(() => {
    if (details.name) {
      const setVariables = async () => {
        const responseSteps = details.steps;
        const jsonSteps = JSON.parse(responseSteps);
        setSteps(jsonSteps);
      };
      setVariables();
    }
  }, [details]);

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
          <div className="nameBox">
            <span className="detailsName">
              <strong>{details.name}</strong>
            </span>
          </div>
          <img className="detailsImage" src={details.image} alt="recipe" />
          <div>
            <div className="titleSteps">
              <strong>Dishes Types</strong>
            </div>
            <div className="steps">
              <span className="detailsColumns">
                {details.dishTypes.map((dishes) => (
                  <li key={dishes} className="detailsDiets">
                    {dishes}
                  </li>
                ))}
              </span>
            </div>
            <span className="title">
              <strong>Summary</strong>
            </span>
            <div
              className="detailsSummary"
              dangerouslySetInnerHTML={{ __html: details.summary }}
            />
          </div>
          <h3 className="health">Health Score: {details.healthScore}</h3>
          <div className="titleSteps">
            <strong>Ingredients</strong>
          </div>
          <span className="steps">
            <span className="detailsColumns">
              {steps.ingredients.map((ingredient) => (
                <li key={ingredient} className="detailsList">
                  {ingredient}
                </li>
              ))}
            </span>
          </span>
          <div className="titleSteps">
            <strong>Equipment</strong>
          </div>
          <span className="steps">
            <span className="detailsColumns">
              {steps.equipment.map((equipment) => (
                <li key={equipment} className="detailsList">
                  {equipment}
                </li>
              ))}
            </span>
          </span>
          <span className="titleSteps">
            <strong>Step by step</strong>
          </span>
          <span className="steps">
            {steps.steps.map((step) => (
              <li key={step} className="detailsList">
                {step}
              </li>
            ))}
          </span>
          <div className="title">
            <h3>Diets</h3>
          </div>
          <div className="steps">
            <span className="detailsColumns">
              {details.Diets.map((d) => (
                <li key={d.name} className="detailsDiets">
                  {d.name}
                </li>
              ))}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
