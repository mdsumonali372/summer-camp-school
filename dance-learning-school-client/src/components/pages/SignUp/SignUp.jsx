import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import signUpImg from "../../../assets/signup.png";
import useAuth from "../../hooks/useAuth";

const SignUp = () => {
  const [eyePassword, setEyePassword] = useState(false);
  const [error, setError] = useState("");
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      setError("Password and confirm password do not match");
      return;
    }
    setError("");
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        const signUpUser = result.user;
        console.log(signUpUser);
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            console.log("user profile update");
            const saveUser = {
              name: data.name,
              email: data.email,
              userImage: data.photoURL,
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
              .then((data) => {
                // console.log(data);
                if (data.insertedId) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User Create Success",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate("/");
                }
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Already Exists",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const tooglePassword = () => {
    setEyePassword(!eyePassword);
  };
  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="md:w-1/2 text-center lg:text-left">
          <img src={signUpImg} alt="login" />
        </div>
        <div className="md:w-1/2 card flex-shrink-0 w-full shadow-2xl bg-base-100 p-5">
          <h1 className="text-5xl font-bold text-center">SignUp now!</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                name="name"
                placeholder="Name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                {...register("photoURL", { required: true })}
                name="photoURL"
                placeholder="Photo URL"
                className="input input-bordered"
              />
              {errors.photoURL && (
                <span className="text-red-500">photoURL is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type={eyePassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="password"
                  className="input input-bordered w-full"
                />
                <div className="absolute right-0 mr-4" onClick={tooglePassword}>
                  {eyePassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                </div>
              </div>
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password have one Uppercase, one number , one smaller case and
                  one special character
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type={eyePassword ? "text" : "password"}
                  {...register("confirmPassword", { required: true })}
                  placeholder="confirm password"
                  className="input input-bordered w-full"
                />
                <div className="absolute right-0 mr-4" onClick={tooglePassword}>
                  {eyePassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                </div>
              </div>
              <p className="text-red-600">{error}</p>
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-primary"
                type="submit"
                value="Sign Up"
              />
            </div>
            <div className="text-center">
              <p>
                You have already account?
                <Link className="text-red-500" to="/login">
                  Please Login
                </Link>
              </p>
            </div>
            <div className="flex flex-col w-full border-opacity-50">
              <div className="divider">OR</div>
            </div>
          </form>
          <div className="text-center">
            <button className="btn btn-circle btn-outline">
              <FaGoogle></FaGoogle>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
