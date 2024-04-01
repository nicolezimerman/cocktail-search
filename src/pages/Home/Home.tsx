import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Drink } from "../../types/cocktails";
import { Link } from "react-router-dom";
import { ROUTES } from "../../const/routes";
import DrinkItem from "../../components/DrinkItem/DrinkItem";

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
      <header className={styles.header}>
        <h1>Cocktails search</h1>
        <input
          className={styles.input}
          type="text"
          placeholder="Search your favorite drink..."
          value={filterDrink}
          onChange={(e) => setFilterDrink(e.target.value)}
        />
        <Link to="/drink/new">Add drink</Link>
      </header>
      <main className={styles.drinksList}>
        {drinks ? (
          drinks.map((drink) => <DrinkItem key={drink.idDrink} drink={drink} />)
        ) : (
          <div>There is nothing to show, try another search!</div>
        )}
      </main>
    </>
  );
}

export default Home;
