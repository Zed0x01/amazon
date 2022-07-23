import "./CheckoutProduct.css";
import StarIcon from "@mui/icons-material/Star";
import { useStateValue } from "../StateProvider";
import "animate.css";

const CheckoutProduct = ({ id, image, title, price, rating, hideButton }) => {
  const [{}, dispatch] = useStateValue();
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <div className={"checkoutProduct animate__animated animate__backInRight"}>
      <img className={"checkoutProduct__image"} src={image} alt="" />
      <div className="checkoutProduct__info">
        <p className={"checkoutProduct__title"}>{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon sx={{ color: "#ffcb49" }} />
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from basket</button>
        )}
      </div>
    </div>
  );
};

export default CheckoutProduct;
