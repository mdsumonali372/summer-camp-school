import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useSelectedClass from "../../../hooks/useSelectedClass";

const MySelectedClass = () => {
  const [myclasses, refetch] = useSelectedClass();
  const handleDelete = (item) => {
    console.log(item._id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://dance-learning-school-server-mdsumonali372.vercel.app/deleteselectclasses/${item._id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };
  return (
    <div className="overflow-x-auto">
      <h2 className="text-center text-2xl font-bold my-10">
        Your Selected Class
      </h2>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>image</th>
            <th>Class Name</th>
            <th>Instructor Name</th>
            <th>Price</th>
            <th>Payment</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {myclasses.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-14 h-14">
                      <img
                        src={item.imgurl}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>{item.className}</td>
              <td>{item.instructorname}</td>
              <td>${item.price}</td>
              <td>
                <Link to={`/dashboard/payment/${item._id}`}>
                  <button className="btn btn-warning btn-xs">Pay</button>
                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(item)}
                  className="btn btn-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MySelectedClass;
