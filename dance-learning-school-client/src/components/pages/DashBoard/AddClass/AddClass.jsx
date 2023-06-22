import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
const image_hosting_token = import.meta.env.VITE_Image_Upload_Token;
console.log(image_hosting_token);

const AddClass = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
  console.log(image_hosting_url);
  const onSubmit = (data) => {
    console.log(data);
    if (data.image && data.image.length > 0) {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      fetch(image_hosting_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imageResponse) => {
          console.log(imageResponse);
          if (imageResponse.success) {
            const imgURL = imageResponse.data.display_url;
            console.log(imgURL);
            const {
              className,
              InstructorName,
              totalSeats,
              instructorEmail,
              price,
            } = data;
            const newItem = {
              className,
              instructorEmail,
              InstructorName,
              instructorImg: user.photoURL,
              totalSeats: parseFloat(totalSeats),
              price: parseFloat(price),
              image: imgURL,
              status: "pending",
              feedBack: "Empty",
              availableSeats: parseFloat(totalSeats),
              enrolled: parseFloat(0),
            };
            console.log(newItem);
            fetch(
              "https://dance-learning-school-server-mdsumonali372.vercel.app/classes",
              {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(newItem),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                reset();
                if (data.insertedId) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Class Item Added",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              });
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  return (
    <div className="card shadow-2xl bg-base-100 w-3/4 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <h2 className="text-center">Add Class</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text uppercase">Class name</span>
          </label>
          <input
            type="text"
            {...register("className", { required: true })}
            placeholder="Class Name"
            className="input input-bordered"
          />
          {errors.className && (
            <span className="text-red-500">Class Name is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Class Image</span>
          </label>
          <input
            type="file"
            {...register("image", {
              required: true,
            })}
            className="input input-bordered"
          />
          {errors.image && (
            <span className="text-red-500">Class Image is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Instructor Name</span>
          </label>
          <input
            type="text"
            defaultValue={user?.displayName}
            {...register("InstructorName", { required: true })}
            placeholder=""
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Instructor Email</span>
          </label>
          <input
            type="email"
            defaultValue={user?.email}
            {...register("instructorEmail", { required: true })}
            placeholder=""
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Total Seats</span>
          </label>
          <input
            type="text"
            {...register("totalSeats", { required: true })}
            placeholder="total Seats"
            className="input input-bordered"
          />
          {errors.availableSeats && (
            <span className="text-red-500">available Seats is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="text"
            {...register("price", { required: true })}
            placeholder="Price"
            className="input input-bordered"
          />
          {errors.price && (
            <span className="text-red-500">price is required</span>
          )}
        </div>
        <div className="form-control mt-6">
          {/* <input  type="submit" value="Add Class" /> */}
          <button type="submit" className="btn btn-primary">
            Add Class
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
