import { useRef } from "react";

import CartModal from "../components/CartModal.jsx";
import logo from "../assets/logo.jpg";

export default function Header() {
  const modal = useRef();

  const cartQuantity = 3;

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button className="text-button">Close</button>
        <button className="button">Go to Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal ref={modal} title="Your Cart" actions={modalActions} />
      <header id="main-header">
        <div id="title">
          <img id="img" src={logo} alt="Logo of the site" />
          <h1>reactfood</h1>
        </div>
        <nav>
          {/* TODO */}
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </nav>
      </header>
    </>
  );
}
