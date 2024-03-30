import { useEffect, useState } from "react";
import "./Home.css";
import { Drink } from "../../types/cocktails";
import { Link } from "react-router-dom";
import { ROUTES } from "../../const/routes";

function Home() {
  const [drinks, setDrinks] = useState<Drink[]>();
  const [filterDrink, setFilterDrink] = useState("");

  useEffect(() => {
    const getDrinks = async () => {
      if (filterDrink.trim() !== "") {
        try {
          const response = await fetch(
            `${ROUTES.SEARCH_BY_NAME}${filterDrink}`
          );
          if (response.ok) {
            const { drinks } = await response.json();
            setDrinks(drinks as Drink[]);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        //save in a reference to not fetch again??
        try {
          const response = await fetch(`${ROUTES.LIST}`);
          if (response.ok) {
            const { drinks } = await response.json();
            setDrinks(drinks as Drink[]);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    getDrinks();
  }, [filterDrink]);

  return (
    <>
      <header>
        <h1>Cocktails search</h1>
        <input
          type="text"
          placeholder="Search your favorite drink..."
          value={filterDrink}
          onChange={(e) => setFilterDrink(e.target.value)}
        />
      </header>
      <main className="drinksList">
        {drinks &&
          drinks.map((drink) => (
            <Link to={`/drink/${drink.idDrink}`}>
              <div className="drink">
                <h3>{drink.strDrink}</h3>
                <img
                  src={`${drink.strDrinkThumb}/preview`}
                  alt={drink.strDrink}
                />
              </div>
            </Link>
          ))}
      </main>
    </>
  );
}

export default Home;
