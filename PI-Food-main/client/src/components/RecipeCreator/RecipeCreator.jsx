import { useState } from "react";
import axios from "axios";
import "./Style.css";

function CreateRecipe() {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [healthScore, setHealthScore] = useState(0);
  const [step, setStep] = useState([]);
  const [showstep, setShowStep] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [showIngedient, setShowIngredient] = useState("");
  const [equipment, setEquipment] = useState([]);
  const [showEquipment, setShowEquipment] = useState("");
  const [image, setImage] = useState(
    "https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png"
  );
  const [diets, setDiets] = useState([]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeSummary(e) {
    setSummary(e.target.value);
  }

  function handleChangeHealthScore(e) {
    setHealthScore(e.target.value);
  }

  function handleChangeStep(e) {
    setShowStep(e.target.value);
  }

  function handleClickSteps(e) {
    e.preventDefault();
    setStep([...step, showstep]);
  }

  function handleChangeIngredients(e) {
    setShowIngredient(e.target.value);
  }

  function handleClickIngredients(e) {
    e.preventDefault();
    setIngredients([...ingredients, showIngedient]);
  }

  function handleChangeEquipment(e) {
    setShowEquipment(e.target.value);
  }

  function handleClickEquipment(e) {
    e.preventDefault();
    setEquipment([...equipment, showEquipment]);
  }

  function handleChangeImage(e) {
    setImage(e.target.value);
  }

  function handleCheckbox(e) {
    if (diets.indexOf(e.target.value) === -1) {
      setDiets([...diets, e.target.value]);
    } else {
      setDiets(diets.filter((item) => item !== e.target.value));
    }
  }

  function handleClick(e) {
    e.preventDefault();
    if (name === "" || summary === "") return;

    if (image === "")
      setImage(
        "https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png"
      );

    // axios
    //   .post("http://localhost:3001/recipes", {
    //     name: name,
    //     summary: summary,
    //     healthScore: healthScore.toString(),
    //     analyzedInstructions: [
    //       {
    //         steps: [
    //           { step: step, ingredients: ingredients, equipment: equipment },
    //         ],
    //       },
    //     ],
    //     image: image,
    //     diets: diets,
    //   })
    //   .then((response) => console.log(response))
    //   .catch((err) => console.log(err));

    console.log({
      name: name,
      summary: summary,
      healthScore: healthScore.toString(),
      analyzedInstructions: [
        {
          steps: [
            { step: step, ingredients: ingredients, equipment: equipment },
          ],
        },
      ],
      image: image,
      diets: diets,
    });
  }

  return (
    <div className="boxCreate">
      <div className="cardCreate">
        <h1 className="mainTitle">Create New Recipe</h1>
        <>
          <h3 className="title">Name</h3>
          <input className="bar" type="text" onChange={handleChangeName} />
        </>
        <>
          <h3 className="title">Summary</h3>
          <input className="bar" type="text" onChange={handleChangeSummary} />
        </>
        <>
          <h3 className="title">Health Score</h3>
          <input
            className="bar"
            type="number"
            onChange={handleChangeHealthScore}
          />
        </>
        <h3 className="title">Steps</h3>
        <>
          {step.map((s) => {
            return (
              <div>
                <>{s.name}</>
              </div>
            );
          })}
          <input className="bar" type="text" onChange={handleChangeStep} />
          <button className="addBtn" onClick={handleClickSteps}>
            <strong>Add Step</strong>
          </button>
        </>
        <>
          <h3 className="title">Ingredients</h3>
          {ingredients.map((i) => {
            return (
              <div>
                <>{i.name}</>
              </div>
            );
          })}
          <input
            className="bar"
            type="text"
            onChange={handleChangeIngredients}
          />
          <button className="addBtn" onClick={handleClickIngredients}>
            <strong>Add Ingredient</strong>
          </button>
        </>
        <>
          <h3 className="title">Equipment Needed</h3>
          {equipment.map((e) => {
            return (
              <div>
                <>{e.name}</>
              </div>
            );
          })}
          <input className="bar" type="text" onChange={handleChangeEquipment} />
          <button className="addBtn" onClick={handleClickEquipment}>
            <strong>Add Equipment</strong>
          </button>
        </>
        <>
          <h3 className="title">Image</h3>
          <input className="bar" type="text" onChange={handleChangeImage} />
        </>
        <>
          <h3 className="title">Diets</h3>
          <div className="checkboxes">
            <div className="checkbox">
              <>Gluten Free</>
              <input
                type="checkbox"
                name="diets"
                value="gluten free"
                onChange={handleCheckbox}
              />
            </div>
            <div className="checkbox">
              <>Dairy Free</>
              <input
                type="checkbox"
                name="diets"
                value="dairy free"
                onChange={handleCheckbox}
              />
            </div>
            <div className="checkbox">
              <>Ketogenic</>
              <input
                type="checkbox"
                name="diets"
                value="ketogenic"
                onChange={handleCheckbox}
              />
            </div>
            <div className="checkbox">
              <>Vegetarian</>
              <input
                type="checkbox"
                name="diets"
                value="vegetarian"
                onChange={handleCheckbox}
              />
            </div>
            <div className="checkbox">
              <>Lacto-Ovo-Vegetarian</>
              <input
                type="checkbox"
                name="diets"
                value="lacto ovo vegetarian"
                onChange={handleCheckbox}
              />
            </div>
            <div className="checkbox">
              <>Vegan</>
              <input
                type="checkbox"
                name="diets"
                value="vegan"
                onChange={handleCheckbox}
              />
            </div>
            <div className="checkbox">
              <>Pescetarian</>
              <input
                type="checkbox"
                name="diets"
                value="pescatarian"
                onChange={handleCheckbox}
              />
            </div>
            <div className="checkbox">
              <>Paleo</>
              <input
                type="checkbox"
                name="diets"
                value="paleolithic"
                onChange={handleCheckbox}
              />
            </div>
            <div className="checkbox">
              <>Primal</>
              <input
                type="checkbox"
                name="diets"
                value="primal"
                onChange={handleCheckbox}
              />
            </div>
            <div className="checkbox">
              <>low FODMAP</>
              <input
                type="checkbox"
                name="diets"
                value="fodmap friendly"
                onChange={handleCheckbox}
              />
            </div>
            <div className="checkbox">
              <>Whole30</>
              <input
                type="checkbox"
                name="diets"
                value="whole 30"
                onChange={handleCheckbox}
              />
            </div>
          </div>
        </>
        <button className="addBtn" onClick={handleClick}>
          <strong>Create New Recipe</strong>
        </button>
      </div>
    </div>
  );
}

export default CreateRecipe;
