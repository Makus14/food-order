import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Cart from "./Cart";
import CustomerForm from "./CustomerForm";

const CartModal = forwardRef(function Modal({ onClose }, ref) {
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const dialog = useRef();

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
        <CustomerForm handleBackClick={handleBackClick} />
      ) : (
        <>
          <Cart />
          <div className="modal-actions">
            <button onClick={onClose} className="text-button">
              Close
            </button>
            <button onClick={handleCheckoutClick} className="button">
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
