import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const googleLogin = () => {
    googleSignIn()
      .then((result) => {
        const googleLogin = result.user;
        console.log(googleLogin);
        const saveUser = {
          name: googleLogin.displayName,
          email: googleLogin.email,
          userImage: googleLogin.photoURL,
          role: "student",
        };
        fetch(
          "https://dance-learning-school-server-mdsumonali372.vercel.app/users",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          }
        )
          .then((res) => res.json())
          .then(() => {});
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="text-center">
        <button onClick={googleLogin} className="btn btn-circle btn-outline">
          <FaGoogle></FaGoogle>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
