import logo from './logo.svg';
import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";

function App() {
  const [product] = React.useState({
    name: "Tesla Roadster",
    price: 64998.67,
    description: "Cool car",
  });

  async function handleToken(token, addresses) {
    // console.log("KK");
    // let response = await fetch("http://localhost:8080/checkout", {
    //   method: "post",
    //   body: JSON.stringify(user),
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    // });
    const response = await axios.post("http://localhost:8080/checkout", {
      token,
      product,
    });
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }
  return (
    <div className="App">
      <div className="container">
        <div className="product">
          <h1>{product.name}</h1>
          <h3>On Sale · ${product.price}</h3>
        </div>
        <StripeCheckout
          stripeKey="STRIPE PUBLISHABLE KEY"
          token={handleToken}
          amount={product.price * 100}
          name="Tesla Roadster"
          billingAddress
          shippingAddress
        />
      </div>
    </div>
  );
}

export default App;
