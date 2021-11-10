import React, { useEffect, useState } from "react";
import "../css/Home.css";

import Recipe from "./Recipe";

export default function Home() {
  const [search, setSearch] = useState("");
  const [empty, setEmpty] = useState(true);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const [recipes, setRecipes] = useState("");
  const [fetches, setFetches] = useState([]);

  useEffect(() => {
    if (fetches.length !== 0) {
      localStorage.setItem(
        "lastFetch",
        JSON.stringify(fetches[fetches.length - 1])
      );
      localStorage.setItem("fetches", JSON.stringify(fetches));
    }
  }, [fetches]);

  useEffect(() => {
    if (recipes.from === 1) {
      setPrev(false);
    }

    if (recipes) {
      if (recipes.hits.length !== 0) {
        setEmpty(false);
      }
      if (recipes._links.next?.href) {
        setNext(true);
      } else {
        setNext(false);
      }
    }
  }, [recipes]);

  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=9204abaa&app_key=55dd7714f0a83b180b6275f96e25d92c&dishType=Drinks`;
  const getData = () => {
    setPrev(false);
    fetch(url)
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
        setFetches([...fetches, url]);
      });
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
        });
    }
    setPrev(true);
  };
  const prevPage = () => {
    backToTop();

    fetches.pop();

    let fetchkendo = fetches[fetches.length - 1];
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
    setFetches([...fetches, fetchkendo]);
  };
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <>
      <div className={empty ? "backgrounder-empty" : "backgrounder"}>
        <div className={empty ? "home-empty" : "topbar"}>
          <h1 className={empty ? "home-title-empty" : "home-title"}>
            Find a recipe!
          </h1>
          <div className="home-control">
            <div
              className={
                empty ? "search-and-button-empty" : "search-and-button"
              }
            >
              <input
                className="searchbar"
                type="text"
                placeholder="Find a recipe"
                onChange={onChange}
              ></input>
              <button className="homebutton searchbutton" onClick={getData}>
                Search
              </button>
            </div>
            <div className="homeButtons">
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
            </div>{" "}
          </div>
        </div>

        <div className="home-main">
          {Object.keys(recipes).length > 0 ? (
            recipes.hits.map((recipe) => <Recipe recipe={recipe} />)
          ) : (
            <div></div>
          )}
        </div>
        <div className="bottom-buttons">
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
      </div>
    </>
  );
}
