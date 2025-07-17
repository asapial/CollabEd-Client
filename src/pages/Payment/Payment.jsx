import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router";

// const stripePromise = loadStripe("pk_test_..."); // Use your public key
const stripePromise = loadStripe("pk_test_51RgL6eQRgeTG2vPVofc4K2Gb6iQ69AVCIP7L4Qk2m2a0O0XW5BFjzyvX2JMNFdEAptHJzvwX5bHhkEuUsK85iPdW00S4AUnzbP"); // Use your public key

const PaymentPage = () => {

    const {id}=useParams();
  return (
    <div className="min-h-screen bg-base-200 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Stripe Payment Page</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm id={id}/>
      </Elements>
    </div>
  );
};

export default PaymentPage;
