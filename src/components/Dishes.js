import React, { useEffect, useState } from "react";
import { NavContext, TitleContext } from "../App";
import Recipe from "./Recipe";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { foodTypes, mealTimes } from "../dropdownData";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

function Dishes() {
  const [title, setTitle] = useState("Title");
  const [context, setContext] = useState(
    JSON.parse(localStorage.getItem("context"))
  );

  const [recipes, setRecipes] = useState("");
  const [fetches, setFetches] = useState([]);
  const [lastClick, setLastClick] = useState("");
  const [selectedFoodType, setFoodType] = useState("Select cuisine type");
  const [selectedMealTime, setMealTime] = useState("Select meal time");
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const urlStart = `https://api.edamam.com/api/recipes/v2?type=public&app_id=c3600678&app_key=073352dcbd07fab1305f749d001d4b83`;

  useEffect(() => {
    if (recipes.from === 1) {
      setPrev(false);
    }

    if (recipes) {
      if (recipes._links.next?.href) {
        setNext(true);
      } else {
        setNext(false);
      }
    }
  }, [recipes]);

  useEffect(() => {
    setFoodType(localStorage.foodType);
    setMealTime(localStorage.mealTime);
    const data = localStorage.getItem("context");
    const localTitle = localStorage.getItem("title");
    if (localTitle) {
      setTitle(JSON.parse(localTitle));
    }

    if (data) {
      setContext(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (fetches.length !== 0) {
      console.log("van fetch");
      localStorage.setItem("lastFetch", JSON.stringify(fetches.slice(-1)));
      localStorage.setItem("fetches", JSON.stringify(fetches));
    } else {
      console.log("nincs fetch");
    }
  }, [fetches]);

  useEffect(() => {
    setMealTime("Select meal time");
    setFoodType("Select cuisine type");
    localStorage.setItem("context", JSON.stringify(context));

    if (localStorage.lastFetch === "") {
      console.log("halo");
      fetch(urlStart + `&dishType=${localStorage.nav}&imageSize=REGULAR`)
        .then()
        .then(function (response) {
          return response.json();
        })
        .then((recipes) => {
          let hits = recipes.hits.map((recipe) => {
            let id = recipe.recipe.uri.split("#")[1].split("_")[1];
            return { ...recipe, id: id };
          });
          recipes.hits = hits;
          setRecipes(recipes);
          // setFetches([
          //   ...fetches,
          //   urlStart + `&dishType=${localStorage.nav}&imageSize=REGULAR`,
          // ]);
          setLastClick("");
        });
    } else if (performance.navigation.type === 1) {
      console.log("na most itt van valami");
      fetch(JSON.parse(localStorage.getItem("lastFetch")))
        .then(function (response) {
          return response.json();
        })
        .then((recipes) => {
          let hits = recipes.hits.map((recipe) => {
            let id = recipe.recipe.uri.split("#")[1].split("_")[1];
            return { ...recipe, id: id };
          });
          recipes.hits = hits;
          setRecipes(recipes);
          // setFetches([
          //   ...fetches,
          //   JSON.parse(localStorage.getItem("lastFetch")),
          // ]);
          setLastClick("");
        });
    } else {
      console.log("dwdwedw");
      fetch(urlStart + `&dishType=${context}&imageSize=REGULAR`)
        .then(function (response) {
          return response.json();
        })
        .then((recipes) => {
          let hits = recipes.hits.map((recipe) => {
            let id = recipe.recipe.uri.split("#")[1].split("_")[1];
            return { ...recipe, id: id };
          });
          recipes.hits = hits;
          setRecipes(recipes);
          // setFetches([
          //   ...fetches,
          //   urlStart + `&dishType=${context}&imageSize=REGULAR`,
          // ]);
          setLastClick("");
        });
    }
  }, [context, urlStart]);

  useEffect(() => {
    if (title !== "") {
      localStorage.setItem("title", JSON.stringify(title));
    }
  }, [title]);

  const submit = () => {
    if (
      selectedFoodType !== "Select cuisine type" &&
      selectedMealTime === "Select meal time"
    ) {
      fetch(
        urlStart +
          `&cuisineType=${selectedFoodType}&dishType=${context}&imageSize=REGULAR`
      )
        .then(function (response) {
          return response.json();
        })
        .then((recipes) => {
          // console.log(recipes);
          let hits = recipes.hits.map((recipe) => {
            let id = recipe.recipe.uri.split("#")[1].split("_")[1];
            return { ...recipe, id: id };
          });
          recipes.hits = hits;
          setRecipes(recipes);
          setFetches([
            ...fetches,
            urlStart +
              `&cuisineType=${selectedFoodType}&dishType=${context}&imageSize=REGULAR`,
          ]);
          setLastClick("");
        });
    }

    if (
      selectedFoodType === "Select cuisine type" &&
      selectedMealTime === "Select meal time"
    ) {
      fetch(urlStart + `&dishType=${context}&imageSize=REGULAR`)
        .then(function (response) {
          return response.json();
        })
        .then((recipes) => {
          let hits = recipes.hits.map((recipe) => {
            let id = recipe.recipe.uri.split("#")[1].split("_")[1];
            return { ...recipe, id: id };
          });
          recipes.hits = hits;
          setRecipes(recipes);
          setFetches([
            ...fetches,
            urlStart + `&dishType=${context}&imageSize=REGULAR`,
          ]);
          setLastClick("");
        });
    }

    if (
      selectedFoodType !== "Select cuisine type" &&
      selectedMealTime !== "Select meal time"
    ) {
      fetch(
        urlStart +
          `&cuisineType=${selectedFoodType}&mealType=${selectedMealTime}&dishType=${context}&imageSize=REGULAR`
      )
        .then(function (response) {
          return response.json();
        })
        .then((recipes) => {
          let hits = recipes.hits.map((recipe) => {
            let id = recipe.recipe.uri.split("#")[1].split("_")[1];
            // console.log(recipes);
            return { ...recipe, id: id };
          });
          recipes.hits = hits;
          setRecipes(recipes);
          setFetches([
            ...fetches,
            urlStart +
              `&cuisineType=${selectedFoodType}&mealType=${selectedMealTime}&dishType=${context}&imageSize=REGULAR`,
          ]);
          setLastClick("");
        });
    }

    if (
      selectedFoodType === "Select cuisine type" &&
      selectedMealTime !== "Select meal time"
    ) {
      fetch(
        urlStart +
          `&mealType=${selectedMealTime}&dishType=${context}&imageSize=REGULAR`
      )
        .then(function (response) {
          return response.json();
        })
        .then((recipes) => {
          let hits = recipes.hits.map((recipe) => {
            let id = recipe.recipe.uri.split("#")[1].split("_")[1];
            return { ...recipe, id: id };
          });
          recipes.hits = hits;
          setRecipes(recipes);
          setFetches([
            ...fetches,
            urlStart +
              `&mealType=${selectedMealTime}&dishType=${context}&imageSize=REGULAR`,
          ]);
          setLastClick("");
        });
    }
  };

  const nextPage = () => {
    backToTop();
    if (recipes._links.next?.href) {
      fetch(recipes._links.next.href)
        .then(function (response) {
          return response.json();
        })
        .then((targets) => {
          let hits = targets.hits.map((target) => {
            let id = target.recipe.uri.split("#")[1].split("_")[1];
            return { ...target, id: id };
          });
          targets.hits = hits;
          setRecipes(targets);
          setFetches([...fetches, recipes._links.next.href]);

          setLastClick("");
        });
    }
    setPrev(true);
  };

  const prevPage = () => {
    backToTop();
    if (lastClick === "prevPage") {
      fetch(fetches.pop())
        .then(function (response) {
          return response.json();
        })
        .then((recipes) => {
          let hits = recipes.hits.map((recipe) => {
            let id = recipe.recipe.uri.split("#")[1].split("_")[1];
            return { ...recipe, id: id };
          });
          recipes.hits = hits;
          setRecipes(recipes);
        });
      setLastClick("prevPage");
    }
    fetches.pop();
    fetch(fetches.pop())
      .then(function (response) {
        return response.json();
      })
      .then((recipes) => {
        let hits = recipes.hits.map((recipe) => {
          let id = recipe.recipe.uri.split("#")[1].split("_")[1];
          return { ...recipe, id: id };
        });
        recipes.hits = hits;
        setRecipes(recipes);
      });
    setLastClick("prevPage");
  };

  const changeMealTime = (e) => {
    setMealTime(e);
    localStorage.setItem("mealTime", e);
  };
  const changeFoodType = (e) => {
    setFoodType(e);
    localStorage.setItem("foodType", e);
  };

  function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <>
      <h1 className="dishes-title">
        {title === "" ? JSON.parse(localStorage.title) : title}
      </h1>
      <div className="control">
        <div className="pageButtons">
          <button
            onClick={prevPage}
            className={prev ? "homebutton pagebutton" : "cantsee"}
          >
            Prev Page
          </button>
          <button
            onClick={nextPage}
            className={next ? "homebutton pagebutton" : "cantsee"}
          >
            Next Page
          </button>
        </div>
        <div className="dropdowns">
          <DropdownButton
            className="dropdown"
            onSelect={changeFoodType}
            key={"a"}
            id={`dropdown-variants-Secondary`}
            variant={"Secondary".toLowerCase()}
            title={selectedFoodType}
          >
            <Dropdown.Item eventKey={"Select cuisine type"}>
              {"Select cuisine type"}
            </Dropdown.Item>
            {foodTypes.map((type) => (
              <Dropdown.Item eventKey={type}>{type}</Dropdown.Item>
            ))}
          </DropdownButton>
          <DropdownButton
            className="dropdown"
            onSelect={changeMealTime}
            key={"b"}
            id={`dropdown-variants-Secondary`}
            variant={"Secondary".toLowerCase()}
            title={selectedMealTime}
          >
            <Dropdown.Item eventKey={"Select meal time"}>
              {"Select meal time"}
            </Dropdown.Item>
            {mealTimes.map((type) => (
              <Dropdown.Item eventKey={type}>{type}</Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
        <div className="submit">
          <button onClick={submit} className="homebutton sub ">
            Submit
          </button>
        </div>
      </div>

      <NavContext.Consumer>
        {(foodCategory) => {
          setContext(foodCategory);

          return (
            <TitleContext.Consumer>
              {(titleContext) => {
                setTitle(titleContext);
                return (
                  <>
                    <div className="main">
                      {Object.keys(recipes).length > 0 ? (
                        recipes.hits.map((recipe) => <Recipe recipe={recipe} />)
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <div className="bottom-buttons ">
                      <button
                        onClick={prevPage}
                        className={prev ? "homebutton pagebutton" : "cantsee"}
                      >
                        Prev Page
                      </button>
                      <button
                        href="#top"
                        onClick={nextPage}
                        className={next ? "homebutton pagebutton" : "cantsee"}
                      >
                        Next Page
                      </button>
                    </div>
                  </>
                );
              }}
            </TitleContext.Consumer>
          );
        }}
      </NavContext.Consumer>
    </>
  );
}

export default Dishes;

// (fetches.length === 0) {
//   console.log("na most itt van valami");
//   fetch(JSON.parse(localStorage.getItem("lastFetch")))
//     .then(function (response) {
//       return response.json();
//     })
//     .then((recipes) => {
//       let hits = recipes.hits.map((recipe) => {
//         let id = recipe.recipe.uri.split("#")[1].split("_")[1];
//         // console.log(recipes);
//         return { ...recipe, id: id };
//       });
//       recipes.hits = hits;
//       setRecipes(recipes);
//       setFetches([
//         ...fetches,
//         JSON.parse(localStorage.getItem("lastFetch")),
//       ]);
//       setLastClick("");
//     });
// }
