import { useState, useEffect } from "react";
import logo from "../assets/logo.jpg";
import { fetchAvailableMeals } from "../http.js";
import Error from "./Error/Error.jsx";

export default function Cart() {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchMeals, setFetchMeals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchAvailableMeals();
        setFetchMeals(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data." });
      }

      setIsFetching(false);
    }

    fetchData();

    console.log(fetchMeals);
  }, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <div id="meals">
      {isFetching && <p>Fetching data...</p>}
      {!isFetching &&
        fetchMeals.length > 0 &&
        fetchMeals.map((meal) => (
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
