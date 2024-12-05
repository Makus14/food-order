import { createContext, useEffect, useReducer, useState } from "react";

import { fetchAvailableMeals } from "../http.js";

export const MealContext = createContext({
  meals: [],
  cartMeals: [],
  isFetching: false,
  error: null,
  addMealToCart: () => {},
  updateMealQuantity: () => {},
});

function mealReducer(state, action) {
  switch (action.type) {
    case "SET_MEALS":
      return {
        ...state,
        meals: action.payload,
      };
    default:
      return state;
  }
}

export default function MealContextProvider({ children }) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();

  const [mealState, dispatch] = useReducer(mealReducer, {
    meals: [],
  });

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      setError(null);
      try {
        const data = await fetchAvailableMeals();
        dispatch({ type: "SET_MEALS", payload: data });
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data." });
      }
      setIsFetching(false);
    }
    fetchData();
  }, []);

  const ctxValue = {
    meals: mealState.meals,
    isFetching,
    error,
  };

  return (
    <MealContext.Provider value={ctxValue}>{children}</MealContext.Provider>
  );
}
