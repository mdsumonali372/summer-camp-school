import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAllClass from "../../hooks/useAllClass";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Classes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [classes] = useAllClass();
  const [isAdmin] = useRole();
  const handleSelectClass = (classItem) => {
    if (!user) {
      return navigate("/login");
    }
    console.log(classItem);
    const selectedCourse = {
      studentName: user.displayName,
      studentEmail: user.email,
      studentImg: user.photoURL,
      className: classItem.className,
      instructorEmail: classItem.instructorEmail,
      imgurl: classItem.image,
      instructorname: classItem.InstructorName,
      price: classItem.price,
      courseId: classItem._id,
      enrolled: false,
    };
    // myclasses
    fetch(
      "https://dance-learning-school-server-mdsumonali372.vercel.app/myclasses",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(selectedCourse),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Item Added SuccessFully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div className="max-w-screen-xl mx-auto my-20">
      <h2>All class: {classes.length}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((classItem) => (
          <div
            key={classItem._id}
            className={`card lg:card-side h-full ${
              classItem.availableSeats === 0 ? "bg-red-500" : "bg-base-100"
            } shadow-xl`}
          >
            <figure>
              <img className="h-64 w-full" src={classItem.image} alt="Album" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{classItem.className}</h2>
              <p>Instructor: {classItem.InstructorName}</p>
              <p>Available Seats: {classItem.availableSeats}</p>
              <p>Price: ${classItem.price}</p>
              <div className="card-actions">
                <button
                  onClick={() => handleSelectClass(classItem)}
                  disabled={
                    classItem.availableSeats === 0 ||
                    isAdmin.role === "admin" ||
                    isAdmin.role === "instructor"
                  }
                  className="btn btn-primary"
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
