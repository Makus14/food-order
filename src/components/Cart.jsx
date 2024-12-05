import { useContext } from "react";

import { MealContext } from "../store/meal-context.jsx";

const meal = [
  {
    id: "m1",
    name: "Mac & Cheese",
    price: "8.99",
    description:
      "Creamy cheddar cheese mixed with perfectly cooked macaroni, topped with crispy breadcrumbs. A classic comfort food.",
    image: "images/mac-and-cheese.jpg",
  },
  {
    id: "m2",
    name: "Margherita Pizza",
    price: "12.99",
    description:
      "A classic pizza with fresh mozzarella, tomatoes, and basil on a thin and crispy crust.",
    image: "images/margherita-pizza.jpg",
  },
];

export default function Cart() {
  //   const totalPrice = items.reduce(
  //     (acc, item) => acc + item.price * item.quantity,
  //     0
  //   );
  //   const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  const totalPrice = meal.reduce(
    (acc, item) => acc + parseFloat(item.price),
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div>
      {meal.length === 0 && <p>No items in cart!</p>}
      {meal.length > 0 && (
        <ul>
          {meal.map((item) => {
            const formattedPrice = `$${parseFloat(item.price).toFixed(2)}`;

            return (
              <li key={item.id} className="cart-item">
                <div>
                  <span>{item.name}</span>
                  <span>
                    {" "}
                    - {3} x {formattedPrice}
                  </span>
                </div>
                <div className="cart-item-actions">
                  <button
                  //   onClick={() => updateItemQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span>{/* {item.quantity} */}3</span>
                  <button
                  //   onClick={() => updateItemQuantity(item.id, 1)}
                  >
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
