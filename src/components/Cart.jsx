import { useContext } from "react";

import { MealContext } from "../store/meal-context.jsx";

export default function Cart() {
  const { cartMeals, updateMealQuantity } = useContext(MealContext);

  const totalPrice = cartMeals.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div>
      {cartMeals.length === 0 && <p>No items in cart!</p>}
      {cartMeals.length > 0 && (
        <ul style={{ paddingLeft: "0px" }}>
          {cartMeals.map((item) => {
            const formattedPrice = `$${parseFloat(item.price).toFixed(2)}`;

            return (
              <li key={item.id} className="cart-item">
                <div>
                  <span>{item.name}</span>
                  <span>
                    {" "}
                    - {item.quantity} x {formattedPrice}
                  </span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => updateMealQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateMealQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p className="cart-total">
        <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
