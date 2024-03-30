import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ROUTES } from "../../const/routes";
import { Drink } from "../../types/cocktails";

const DrinkDetail = () => {
  const { drinkId } = useParams();
  const [drink, setDrink] = useState<Drink>();

  useEffect(() => {
    const getDrink = async () => {
      if (!drinkId) return;
      try {
        const response = await fetch(`${ROUTES.GET_BY_ID}${drinkId}`);
        if (response.ok) {
          const { drinks } = await response.json();
          setDrink(drinks[0] as Drink);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDrink();
  }, [drinkId]);

  const ingredientsList = useMemo(() => {
    if (!drink) return [];
    return Object.entries(drink).filter(
      ([key, value]) => key.startsWith("strIngredient") && value !== null
    );
  }, [drink]);

  const measuresList = useMemo(() => {
    if (!drink) return [];
    const res = Object.entries(drink).filter(
      ([key, value]) => key.startsWith("strMeasure") && value !== null
    );
    console.log(res);
    return res;
  }, [drink]);

  return (
    <div>
      {drink ? (
        <main>
          <h2>{drink.strDrink}</h2>
          <img src={drink.strDrinkThumb} alt={drink.strDrink} width={300} />
          <div>
            <h3>Instructions:</h3>
            {drink.strInstructions}
          </div>
          <div>
            <h3>Ingredients:</h3>
            {ingredientsList.map(([key, value], index) => (
              <div key={key}>
                {value} {measuresList[index]?.[1]}
              </div>
            ))}
          </div>
          <div>
            <h3>Category:</h3>
            {drink.strCategory}
          </div>
        </main>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default DrinkDetail;
