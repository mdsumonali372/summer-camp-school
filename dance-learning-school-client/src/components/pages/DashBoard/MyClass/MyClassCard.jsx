import { Link } from "react-router-dom";
const MyClassCard = ({ classItem }) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img className="h-72 w-full" src={classItem?.image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-[14px]">{classItem.className}</h2>
        <p className="font-bold text-xs">
          Instructor Name : {classItem.InstructorName}
        </p>
        <p className="font-bold text-xs">
          Instructor Email: {classItem.instructorEmail}
        </p>
        <p className="font-bold text-xs">Total seats: {classItem.totalSeats}</p>
        <p className="font-bold text-xs">
          Available seats: {classItem.availableSeats}
        </p>
        <p className="font-bold text-xs">Enrolled: {classItem.enrolled}</p>
        <p className="font-bold text-xs">Price: ${classItem.price}</p>
        <p className="font-bold text-xs">
          Status: <span className="text-red-700">{classItem.status}</span>{" "}
        </p>
        <p className="font-bold text-xs">
          Feed Back: <span className="text-red-700">{classItem.feedBack}</span>
        </p>
        <Link>
          <button className="btn btn-primary">Update</button>
        </Link>
      </div>
    </div>
  );
};

export default MyClassCard;
