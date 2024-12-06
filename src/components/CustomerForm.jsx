import { useContext, useState } from "react";
import { submitOrder } from "../http";
import { MealContext } from "../store/meal-context";

export default function CustomerForm({
  handleBackClick,
  closeModal,
  totalAmount,
}) {
  const { cartMeals, clearCart } = useContext(MealContext);

  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.customer.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (
      !formData.customer.email.trim() ||
      !formData.customer.email.includes("@")
    ) {
      newErrors.email = "Valid email is required";
    }

    if (!formData.customer.street.trim()) {
      newErrors.street = "Street is required";
    }

    if (!formData.customer["postal-code"].trim()) {
      newErrors["postal-code"] = "Postal code is required";
    }

    if (!formData.customer.city.trim()) {
      newErrors.city = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmitOrder() {
    const formData = {
      customer: {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        street: document.getElementById("street").value,
        "postal-code": document.getElementById("code").value,
        city: document.getElementById("city").value,
      },
      items: cartMeals,
    };

    if (!validateForm(formData)) {
      return;
    }

    try {
      const response = await submitOrder(formData);
      console.log("Order submitted successfully", response);
      clearCart();
      closeModal();
    } catch (error) {
      console.error("Error submitting order:", error.message);
    }
  }

  return (
    <form>
      <div style={{ marginBottom: "20px" }}>
        <label>Total amount: {totalAmount}</label>
      </div>
      <div className="control">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          placeholder="Your Name"
          required
          style={{
            marginBottom: "1px",
            borderColor: errors.name ? "red" : "initial",
          }}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

        <label htmlFor="address">E-Mail Address</label>
        <input
          id="email"
          type="text"
          placeholder="Your Email"
          required
          style={{
            marginBottom: "1px",
            borderColor: errors.email ? "red" : "initial",
          }}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        <label htmlFor="address">Street</label>
        <input
          id="street"
          type="text"
          placeholder="Your Street"
          required
          style={{
            marginBottom: "1px",
            borderColor: errors.street ? "red" : "initial",
          }}
        />
        {errors.street && <p style={{ color: "red" }}>{errors.street}</p>}

        <div className="control-row" style={{ marginBottom: "5px" }}>
          <div>
            <label htmlFor="address">Poste Code</label>
            <input
              id="code"
              type="text"
              placeholder="Your Poste Code"
              required
              style={{
                borderColor: errors["postal-code"] ? "red" : "initial",
              }}
            />
            {errors["postal-code"] && (
              <p style={{ color: "red" }}>{errors["postal-code"]}</p>
            )}
          </div>
          <div>
            <label htmlFor="address">City</label>
            <input
              id="city"
              type="text"
              placeholder="Your City"
              required
              style={{
                borderColor: errors.city ? "red" : "initial",
              }}
            />
            {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
          </div>
        </div>
      </div>

      <div className="modal-actions">
        <button className="text-button" type="button" onClick={handleBackClick}>
          Back
        </button>
        <button className="button" type="button" onClick={handleSubmitOrder}>
          Submit Order
        </button>
      </div>
    </form>
  );
}
