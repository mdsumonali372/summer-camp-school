import { Link } from "react-router-dom";
import errorImg from "../../../assets/error.png";
const ErrorPage = () => {
  return (
    <div className="mx-auto text-center my-20">
      <img className="bloc mx-auto" src={errorImg} alt="" />
      <Link to="/">
        <button className="btn mt-10">Back To Homepage</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
