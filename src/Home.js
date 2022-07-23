import React from "react";
import "./Home.css";
import Product from "./Product";

const Home = () => {
  return (
    <div className={"home"}>
      <div className="home__container">
        <img
          className={"home__image"}
          src="https://m.media-amazon.com/images/I/51kyN9jKbJL._SX1500_.jpg"
          alt=""
        />
        <div className="home__row">
          <Product
            id={954}
            title={
              "Lightning Cable Apple MFi Certified 6ft iPhone Charger Cable 13 12 11 XS Pro Max Mini XR X 8 7 Plus iPad Best Products USB Fast Car Charging Braided Cord"
            }
            price={9.99}
            image={
              "https://m.media-amazon.com/images/I/710GFECL8yL._AC_UL320_.jpg"
            }
            rating={3}
          />
          <Product
            id={645}
            title={
              "Apple AirPods (2nd Generation) Wireless Earbuds with Lightning Charging Case Included. Over 24 Hours of Battery Life, Effortless Setup. Bluetooth Headphones for iPhone"
            }
            price={249.99}
            image={
              "https://m.media-amazon.com/images/I/7120GgUKj3L._AC_UL320_.jpg"
            }
            rating={5}
          />
        </div>
        <div className="home__row">
          <Product
            id={342}
            title={"Apple Pencil (2nd Generation), White"}
            price={12.59}
            image={
              "https://m.media-amazon.com/images/I/21SPDoiRuGL._AC_UL320_.jpg"
            }
            rating={2}
          />
          <Product
            id={34}
            title={
              "Roku Express | HD Streaming Media Player with High Speed HDMI Cable and Simple Remote"
            }
            price={29}
            image={
              "https://m.media-amazon.com/images/I/717dWfmxXVL._AC_UL320_.jpg"
            }
            rating={4}
          />
          <Product
            id={4}
            title={
              "Apple EarPods Headphones with Lightning Connector. Microphone with Built-in Remote to Control Music, Phone Calls, and Volume. Wired Earbuds for iPhone"
            }
            price={19.99}
            image={
              "https://m.media-amazon.com/images/I/41-aexp44tL._AC_UL320_.jpg"
            }
            rating={2}
          />
        </div>
        <div className="home__row">
          <Product
            id={3}
            title={
              'Sceptre 24" Professional Thin 75Hz 1080p LED Monitor 2x HDMI VGA Build-in Speakers, Machine Black (E248W-19203R Series)'
            }
            price={128.43}
            image={
              "https://m.media-amazon.com/images/I/71rXSVqET9L._AC_UL320_.jpg"
            }
            rating={5}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
