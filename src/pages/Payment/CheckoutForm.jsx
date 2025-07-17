import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import useFetchApi from "../../Api/useFetchApi";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../main";
import { SuccessToast } from "../../utils/ToastMaker";

const CheckoutForm = ({ id }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { getSessionById,bookSession } = useFetchApi();
  const { user } = useContext(AuthContext);

  const { data: session } = useQuery({
    queryKey: ["session", id],
    queryFn: () => getSessionById(id),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const card = elements.getElement(CardElement);
    if (!stripe || !elements || !card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error.message);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const res = await axios.post("http://localhost:3000/create-payment-intent", {
      amount: parseInt(session?.registrationFee),
    });

    if (!res.data?.clientSecret) {
      console.error("Client secret not received");
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      res.data.clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      }
    );

    if(paymentIntent.status === "succeeded") {
        SuccessToast("Payment successful!");
              bookSession({
                studentEmail: user.email,
                tutorEmail: session.tutorEmail,
                sessionId: session._id,
                sessionTitle: session.title,
              }).then((data) => {
                if (data.acknowledged) {
                  SuccessToast("Session booked successfully!");
                }
              });
    }

    if (confirmError) {
      console.log("Payment failed:", confirmError.message);
    } else {
      console.log("Payment successful:", paymentIntent);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          className="border rounded p-3 bg-base-200"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#444",
                "::placeholder": { color: "#aaa" },
              },
              invalid: { color: "#e53e3e" },
            },
          }}
        />
        <button
          className="btn btn-primary mt-5 w-full flex items-center justify-center gap-2"
          type="submit"
          disabled={!stripe}
        >
          <FaLock /> {`Pay $${session?.registrationFee || ""}`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
