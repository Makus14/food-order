import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useContext,
} from "react";
import { createPortal } from "react-dom";
import Cart from "./Cart";
import CustomerForm from "./CustomerForm";
import { MealContext } from "../store/meal-context";

const CartModal = forwardRef(function Modal({ onClose }, ref) {
  const { cartMeals } = useContext(MealContext);

  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [totalAmount, setTotalAmount] = useState();
  const dialog = useRef();

  let isCartMealIsEmpty = cartMeals.length;

  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current.showModal();
    },
    close: () => dialog.current.close(),
  }));

  const handleCheckoutClick = () => setIsCheckoutMode(true);
  const handleBackClick = () => setIsCheckoutMode(false);

  return createPortal(
    <dialog className="modal" ref={dialog}>
      <h2>{isCheckoutMode ? "Checkout" : "Your Cart"}</h2>

      {isCheckoutMode ? (
        <CustomerForm
          totalAmount={totalAmount}
          handleBackClick={handleBackClick}
          closeModal={() => {
            setIsCheckoutMode(false);
            dialog.current.close();
          }}
        />
      ) : (
        <>
          <Cart setTotalAmount={setTotalAmount} />
          <div className="modal-actions">
            <button onClick={onClose} className="text-button">
              Close
            </button>
            <button
              onClick={handleCheckoutClick}
              className="button"
              disabled={isCartMealIsEmpty > 0 ? false : true}
            >
              Go to Checkout
            </button>
          </div>
        </>
      )}
    </dialog>,
    document.getElementById("modal")
  );
});

export default CartModal;
