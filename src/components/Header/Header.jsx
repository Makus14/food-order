import { useContext, useRef } from "react";

import CartModal from "../CartModal.jsx";
import logo from "../../assets/logo.jpg";
import styles from "../Header/Header.module.css";
import { MealContext } from "../../store/meal-context.jsx";

export default function Header() {
  const { cartMeals } = useContext(MealContext);
  const modal = useRef();

  const cartQuantity = cartMeals.length > 0 ? `(${cartMeals.length})` : null;

  function handleOpenCartClick() {
    modal.current.open();
  }

  return (
    <>
      <CartModal ref={modal} onClose={() => modal.current.close()} />
      <header id="main-header">
        <div id="title">
          <img id="img" src={logo} alt="Logo of the site" />
          <h1>reactfood</h1>
        </div>
        <nav>
          <div className={styles.cartItemAction}>
            <button onClick={handleOpenCartClick} className={styles.button}>
              Cart {cartQuantity}
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
