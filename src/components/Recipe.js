import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Recipe = ({ recipe }) => {
  const { label, image, cuisineType, mealType } = recipe.recipe;
  const { id } = recipe;
  return (
    <div className="food-box">
      <div className="pic-and-text-box">
        <img alt="" src={image} className="food-pic"></img>

        <Link style={{ textDecoration: "none" }} to={`/recipe/${id}`}>
          <h2 className="food-name">{label}</h2>
        </Link>
        <p className="preview-text">
          <span className="preview-tag">{cuisineType}</span>{" "}
          <span className="preview-tag">{mealType}</span> <br></br>
        </p>
      </div>
    </div>
  );
};
export default Recipe;
