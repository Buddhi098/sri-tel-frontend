import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Axios_payments, Axios_packages, Axios_user } from "../api/Axios";
import * as API_ENDPOINTS from "../api/ApiEndpoints";
import { useSelector } from "react-redux";
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};
export default function PaymentTotalForm(props) {
  const userid = useSelector((state) => state.UserReducer.userid);
  const userrid = localStorage.getItem("user_id");
  console.log(userrid);
  const amount = props.amount * 100;
  const p_id = props.id;
  console.log(userid);
  const [success, setSuccess] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        Axios_user.post(API_ENDPOINTS.PAY_FOR_ALL_PACKAGES, {
          user_id: userrid,
        }).then((response) => {
          console.log(response);
          // if (response.data.type == 'success') {
          // 	Axios_packages.post(API_ENDPOINTS.ACTIVATE_PACKAGE, {
          // 		user_id: userrid,
          // 		package_id: p_id,
          // 	}).then((response_2) => {
          // 		console.log(response_2);
          // 	});
          // 	setSuccess(true);
          // }

		  setSuccess(true);
        });
        //console.log(response)
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button
            style={{
              width: "15%",
              background: "linear-gradient(to right, #1e90ff, #00bfff)",
              border: "none",
              borderRadius: "8px", 
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s", 
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
			  marginLeft:"15px",
			  padding:"10px 20px"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)"; 
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
            }}
          >
            Pay
          </button>
        </form>
      ) : (
        <div>
          <h2>Payment success</h2>
        </div>
      )}
    </>
  );
}
