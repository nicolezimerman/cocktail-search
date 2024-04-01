import { Link } from "react-router-dom";
import { Drink } from "../../types/cocktails";
import styles from "./DrinkItem.module.css";

interface DrinkItemProps {
  drink: Drink;
}
const DrinkItem = ({ drink }: DrinkItemProps) => {
  return (
    <Link to={`/drink/${drink.idDrink}`}>
      <div className={styles.drink}>
        <img
          className={styles.image}
          src={`${drink.strDrinkThumb}/preview`}
          alt={drink.strDrink}
        />
        <h3>{drink.strDrink}</h3>
      </div>
    </Link>
  );
};

export default DrinkItem;
