import "./Order.css";
import { format } from "timeago.js";
import CheckoutProduct from "./CheckoutProduct";

const Order = ({ order }) => {
  return (
    <div className={"order"}>
      <h1>Order</h1>
      <div className="order__time">
        <p>{order?.data?.createdAt} </p>
        <p>: {format(order?.data?.createdAt)}</p>
      </div>
      <p className={"order__id"}>{order?.id}</p>
      {order?.data?.basket?.map((details) => (
        <CheckoutProduct
          key={order?.id}
          title={details?.title}
          rating={details?.rating}
          price={details?.price}
          image={details?.image}
          hideButton
        />
      ))}
      <p className={"order__total"}>Order Total: ${order?.data?.amount}</p>
    </div>
  );
};

export default Order;
