import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import useFetchApi from "../../Api/useFetchApi";
import { FaLock, FaCreditCard } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../main";
import { SuccessToast } from "../../utils/ToastMaker";
import { useNavigate } from "react-router";

const CheckoutForm = ({ id }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { getSessionById, bookSession } = useFetchApi();
  const { user } = useContext(AuthContext);
  const navigate=useNavigate();

  const [loading, setLoading] = useState(false);

  const { data: session } = useQuery({
    queryKey: ["session", id],
    queryFn: () => getSessionById(id),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const card = elements.getElement(CardElement);
    if (!stripe || !elements || !card) return;

    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error("Stripe Error:", error.message);
      setLoading(false);
      return;
    }

    const res = await axios.post("https://collab-ed-server.vercel.app/create-payment-intent", {
      amount: parseInt(session?.registrationFee),
    });

    const clientSecret = res?.data?.clientSecret;
    if (!clientSecret) {
      console.error("Client secret not received");
      setLoading(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
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

    if (paymentIntent?.status === "succeeded") {
      SuccessToast("✅ Payment successful!");
      await bookSession({
        studentEmail: user.email,
        tutorEmail: session.tutorEmail,
        sessionId: session._id,
        sessionTitle: session.title,
      }).then((data) => {
        if (data?.acknowledged) {
          SuccessToast("🎉 Session booked successfully!");
          navigate('/studentDashboard/bookedSession')
        }
      });
    } else if (confirmError) {
      console.error("Payment failed:", confirmError.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-5">
      <div className="card shadow-lg bg-base-100 border border-base-300 rounded-xl">
        <div className="card-body">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaCreditCard className="text-primary" />
            Secure Payment
          </h2>
          <p className="text-sm text-base-content/60 mb-4">
            Pay <strong>${session?.registrationFee || 0}</strong> to book your session with{" "}
            <span className="font-medium">{session?.tutorName}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement
              className="border rounded-md p-4 bg-base-200"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "var(--fallback-bc, #000)",
                    "::placeholder": { color: "#aaa" },
                  },
                  invalid: { color: "red" },
                },
              }}
            />

            <button
              className={`btn btn-primary w-full flex items-center justify-center gap-2 ${
                loading ? "loading" : ""
              }`}
              type="submit"
              disabled={!stripe || loading}
            >
              {!loading && <FaLock />}
              {loading ? "Processing..." : `Pay $${session?.registrationFee || ""}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
