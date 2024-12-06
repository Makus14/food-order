export async function fetchAvailableMeals() {
    const response = await fetch("http://localhost:3000/meals");
    const resData = await response.json();

    if (!response.ok) {
        throw new Error("Failed to fetch meals");
    }

    return resData;
}

export async function submitOrder(orderData) {
    const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ order: orderData }),
    });

    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || "Failed to submit order");
    }

    return resData;
}
