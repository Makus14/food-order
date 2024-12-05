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
    case "ADD_MEAL": {
      const updatedMeals = [...state.cartMeals];

      const existingCartMealIndex = updatedMeals.findIndex(
        (cartMeal) => cartMeal.id === action.payload
      );
      const existingCartMeal = updatedMeals[existingCartMealIndex];

      if (existingCartMeal) {
        const updatedMeal = {
          ...existingCartMeal,
          quantity: existingCartMeal.quantity + 1,
        };
        updatedMeals[existingCartMealIndex] = updatedMeal;
      } else {
        const product = state.meals.find(
          (product) => product.id === action.payload
        );
        updatedMeals.push({
          id: action.payload,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        ...state,
        cartMeals: updatedMeals,
      };
    }
    case "UPDATE_MEAL": {
      const updatedMeals = [...state.cartMeals];
      const updatedMealIndex = updatedMeals.findIndex(
        (cartMeal) => cartMeal.id === action.payload.productId
      );

      const updatedMeal = {
        ...updatedMeals[updatedMealIndex],
      };

      updatedMeal.quantity += action.payload.amount;

      if (updatedMeal.quantity <= 0) {
        updatedMeals.splice(updatedMealIndex, 1);
      } else {
        updatedMeals[updatedMealIndex] = updatedMeal;
      }

      return {
        ...state,
        cartMeals: updatedMeals,
      };
    }
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export default function MealContextProvider({ children }) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();

  const [mealState, dispatch] = useReducer(mealReducer, {
    meals: [],
    cartMeals: [],
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

  function handleAddMealToCart(id) {
    dispatch({
      type: "ADD_MEAL",
      payload: id,
    });
  }

  function handleUpdateCartMealQuantity(productId, amount) {
    dispatch({
      type: "UPDATE_MEAL",
      payload: {
        productId,
        amount,
      },
    });
  }

  const ctxValue = {
    meals: mealState.meals,
    cartMeals: mealState.cartMeals,
    isFetching,
    error,
    addMealToCart: handleAddMealToCart,
    updateMealQuantity: handleUpdateCartMealQuantity,
  };

  return (
    <MealContext.Provider value={ctxValue}>{children}</MealContext.Provider>
  );
}
