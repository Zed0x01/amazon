import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./components/CheckoutProduct";
import "./Payment.css";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { getBasketTotal } from "./reducer";
import CurrencyFormat from "react-currency-format";
import axios from "./axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const Payment = () => {
  const elements = useElements();
  const stripe = useStripe();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(null);
  const [{ user, basket }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const amount = getBasketTotal(basket);
  const getClientSecret = async () => {
    const res = await axios.post("/checkout/intent", {
      amount: amount * 100,
    });
    setClientSecret((prev) => res?.data?.client_secret);
    console.log(res?.data?.client_secret);
    console.log(clientSecret);
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    getClientSecret();
    setProcessing(true);
    if (clientSecret !== "") {
      await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        })
        .then((paymentIntent) => {
          // payment intent = payment confirmation
          const ref = doc(
            db,
            "users",
            `${user?.uid}/orders/${paymentIntent?.paymentIntent?.id}`
          );
          setDoc(ref, {
            basket: basket,
            amount: amount,
            createdAt: new Date().toString(),
          });
          dispatch({
            type: "EMPTY_BASKET",
          });
          setSucceeded(true);
          setError(null);
          setProcessing(false);
          navigate("/orders");
        });
    }
  };

  useEffect(() => {
    getClientSecret();
  }, [basket]);

  return (
    <div className={"payment"}>
      <div className="payment__container">
        <h1>
          Checkout (<Link to={"/checkout"}>{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket?.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {user ? (
          <div className="payment__section">
            <div className="payment__title">
              <h3>Payment Method</h3>
            </div>
            <div className="payment__details">
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />
                <div className="payment__priceContainer">
                  <CurrencyFormat
                    renderText={(value) => <h3>Order Total :{value}</h3>}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                  <button disabled={disabled || succeeded || processing}>
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                  </button>
                </div>
                {error && <div>{error}</div>}
              </form>
            </div>
          </div>
        ) : (
          <Link to={"/login"}>
            <div style={{ textAlign: "center", padding: "30px" }}>
              <button
                style={{
                  padding: "10px 30px",
                  fontSize: "20px",
                  fontWeight: "500",
                  outline: "none",
                  border: "none",
                  background: "#f0c14b",
                  cursor: "pointer",
                }}
              >
                Login First to make purchase
              </button>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Payment;
