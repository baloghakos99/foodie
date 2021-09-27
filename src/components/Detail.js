import React, { useEffect, useState } from "react";
import "../css/Detail.css";

export default class DetailedStarter extends React.Component {
  constructor(props) {
    super(props);

    this.actualStarterId = this.props.match.params.ID;
    this.state = {
      actualStarter: {},
    };
  }

  componentDidMount() {
    fetch(
      `https://api.edamam.com/api/recipes/v2/${this.actualStarterId}?type=public&app_id=9204abaa&app_key=55dd7714f0a83b180b6275f96e25d92c`
    )
      .then(function (response) {
        return response.json();
      })

      .then((recipe) =>
        this.setState(
          (state) => ({ actualStarter: recipe }),
          console.log(recipe)
        )
      );
  }

  render() {
    let food = this.state.actualStarter;
    // console.log(food.recipe.totalDaily);
    return (
      <>
        {Object.keys(food).length > 0 ? (
          <div className="detail">
            <div className="detail-title">
              <h1>{food.recipe.label}</h1>
            </div>
            <div className="detail-main">
              <div className="left">
                <img src={food.recipe.image} className="img"></img>
                <div className="ingredients-text">
                  <p className="detail-ingredients"> Ingredients:</p>{" "}
                  <ul>
                    {food.recipe.ingredientLines.map((ing) => (
                      <li>{ing}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="middle">
                <table className="infos-table">
                  <tr>
                    <th>More infos</th>
                    <th></th>
                  </tr>
                  <tr>
                    <td>Cuisine type:</td>
                    <td>{food.recipe.cuisineType}</td>
                  </tr>
                  <tr>
                    <td>Cautions:</td>
                    <td>
                      {food.recipe.cautions.length === 0
                        ? "-"
                        : food.recipe.cautions.map((cat) => `${cat}, `)}
                    </td>
                  </tr>
                  <tr>
                    <td>Dish type:</td>
                    <td>{food.recipe.dishType}</td>
                  </tr>
                  <tr>
                    <td>Diet labels:</td>
                    <td>{food.recipe.dietLabels.map((cat) => `${cat}, `)}</td>
                  </tr>
                  <tr>
                    <td>Calories:</td>
                    <td>{food.recipe.calories.toFixed(0)}</td>
                  </tr>
                </table>
                <div className="label-box">
                  {food.recipe.healthLabels.map((label) => (
                    <span className="health-label">{label} </span>
                  ))}
                </div>
              </div>
              <div className="right">
                <table>
                  <tr>
                    <th>Nutrient</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                  </tr>
                  {food.recipe.digest.map((nut) => (
                    <tr>
                      <td>{nut.label}</td>
                      <td>{nut.total.toFixed(4)}</td>
                      <td>{nut.unit}</td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>

            {/* <div className="top-box">
              <img src={food.recipe.image}></img>
              <div className="label-box">
                {food.recipe.healthLabels.map((label) => (
                  <span className="health-label">{label} </span>
                ))}
                <br></br> <br></br>
                <span className="detail-ingredients"> Ingredients:</span>{" "}
                {food.recipe.ingredients[0].text}
              </div>
            </div>
            <div className="tables">
              <div>
                <table>
                  <tr>
                    <td>Cuisine type:</td>
                    <td>{food.recipe.cuisineType}</td>
                  </tr>
                  <tr>
                    <td>Cautions:</td>
                    <td>
                      {food.recipe.cautions.length === 0
                        ? "-"
                        : food.recipe.cautions.map((cat) => `${cat}, `)}
                    </td>
                  </tr>
                  <tr>
                    <td>Dish type:</td>
                    <td>{food.recipe.dishType}</td>
                  </tr>
                  <tr>
                    <td>Diet labels:</td>
                    <td>{food.recipe.dietLabels.map((cat) => `${cat}, `)}</td>
                  </tr>
                </table>
              </div>
              <div>
                <table>
                  <tr>
                    <th>Food</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                  </tr>
                  {food.recipe.ingredients.map((ing) => (
                    <tr>
                      <td>{ing.food}</td>
                      <td>{ing.quantity}</td>
                      <td>
                        {ing.measure === "<unit>" ? "piece" : ing.measure}
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
              <div>
                <table>
                  <tr>
                    <th>Nutrient</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                  </tr>
                  {food.recipe.digest.map((nut) => (
                    <tr>
                      <td>{nut.label}</td>
                      <td>{nut.total.toFixed(4)}</td>
                      <td>{nut.unit}</td>
                    </tr>
                  ))}
                </table>
              </div>
            </div> */}
          </div>
        ) : (
          <div></div>
        )}
      </>
    );
  }
}
