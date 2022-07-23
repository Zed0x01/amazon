import "./App.css";
import { useEffect } from "react";
import Header from "./components/Header";
import Home from "./Home";
import Checkout from "./Checkout";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";
const promise = loadStripe(
  "pk_test_51LHHjWLQZNLkqAkFCQtN1GNhbLz6BaGqkvlhGZu1u5Y5Ad1FzgCgZeOGNfZmX7ZrVfNM6bX8vwEbHmTx9OTKPmKZ00z2fKImXS"
);

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path={"/"}
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path={"/payment"}
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          />
          <Route path={"/login"} element={<Login />} />
          <Route
            path={"/checkout"}
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
          <Route
            path={"/orders"}
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
