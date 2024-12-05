import { useContext } from "react";
import Error from "./Error/Error.jsx";
import { MealContext } from "../store/meal-context.jsx";

export default function Meal() {
  const { items, isFetching, error } = useContext(MealContext);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <div id="meals">
      {isFetching && <p>Fetching data...</p>}
      {!isFetching &&
        items.length > 0 &&
        items.map((meal) => (
          <div key={meal.id} className="meal-item">
            <div className="article">
              <img src={`http://localhost:3000/${meal.image}`} />
              <h3>{meal.name}</h3>
              <div className="meal-item-price">{meal.price}</div>
              <p className="meal-item-description">{meal.description}</p>
            </div>
            <div className="meal-item-actions">
              <button className="button">Add to Cart</button>
            </div>
          </div>
        ))}
    </div>
  );
}
