import React from "react";
import "./Checkout.css";
import Subtotal from "./components/Subtotal";
import CheckoutProduct from "./components/CheckoutProduct";
import { useStateValue } from "./StateProvider";

const Checkout = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className={"checkout"}>
      <div className="checkout__left">
        <img
          className={"checkout__ad"}
          src="https://images-na.ssl-images-amazon.com/images/G/02//UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        {basket?.length ? (
          <div>
            <h3>Hello, {user?.email}</h3>
            <h2 className="checkout__title">Your shopping basket</h2>
            {basket?.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        ) : (
          <h1 style={{ textAlign: "center" }}>Your cart is empty</h1>
        )}
      </div>

      <div className="checkout__right">{basket?.length && <Subtotal />}</div>
    </div>
  );
};

export default Checkout;
