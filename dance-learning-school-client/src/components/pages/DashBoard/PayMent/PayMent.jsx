import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Secret_Key);
const PayMent = () => {
  const [classData, setClassData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(
      `https://dance-learning-school-server-mdsumonali372.vercel.app/dataforpayment/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setClassData(data);
      });
  }, [id]);
  return (
    <div>
      <h2>Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckOutForm classData={classData}></CheckOutForm>
      </Elements>
    </div>
  );
};

export default PayMent;
