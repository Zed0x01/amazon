import "./Orders.css";
import { db } from "./firebase";
import {
  getDocs,
  doc,
  query,
  where,
  collection,
  onSnapshot,
} from "firebase/firestore";
import Order from "./components/Order";
import { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
const Orders = () => {
  const [{ user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const ref = await collection(db, `users`, `${user?.uid}`, `orders`);
        console.log(ref);
        await onSnapshot(ref, (res) => {
          setOrders(
            res.docs.map((order) => ({
              id: order.id,
              data: order.data(),
            }))
          );
        });
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [user?.uid]);
  console.log(orders);
  return (
    <div className={"orders"}>
      <h1>Your Orders</h1>
      {orders?.map((order, index) => (
        <Order order={order} key={index} />
      ))}
    </div>
  );
};

export default Orders;
