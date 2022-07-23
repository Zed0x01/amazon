import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Header = () => {
  const [{ basket, user }, reducer] = useStateValue();
  const handleAuth = () => {
    if (user) {
      signOut(auth)
        .then(() => {
          console.log("Signed Out");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  return (
    <div className={"header"}>
      <Link to={"/"}>
        <img
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          className={"header__logo"}
        />
      </Link>
      <div className={"header__search"}>
        <input type="text" className={"header__searchInput"} />
        <SearchIcon className={"header__searchIcon"} />
      </div>
      <div className="header__nav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuth} className="header__option">
            <span className="header__optionOne">
              {user ? user?.email : "Hello Guest"}
            </span>
            <span className="header__optionTwo">
              {user ? "Sign Out" : "Sign in"}
            </span>
          </div>
        </Link>
        <Link to={"/orders"}>
          <div className="header__option">
            <span className="header__optionOne">Return's</span>
            <span className="header__optionTwo">& Orders</span>
          </div>
        </Link>
        <div className="header__option">
          <span className="header__optionOne">Your</span>
          <span className="header__optionTwo">Prime</span>
        </div>

        <Link to={"/checkout"}>
          <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
