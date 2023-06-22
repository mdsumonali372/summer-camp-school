import Swal from "sweetalert2";
import useClass from "../../../hooks/useClass";

const ClassCard = ({ classItem }) => {
  const [, refecth] = useClass();
  const statusApprove = (classItem, status) => {
    console.log(classItem._id);
    const statusChange = {
      status,
    };
    fetch(
      `https://dance-learning-school-server-mdsumonali372.vercel.app/classes/status/${classItem._id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(statusChange),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refecth();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${status} done`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleApprove = (classItem) => {
    statusApprove(classItem, "approve");
  };

  const handleDenied = (classItem) => {
    statusApprove(classItem, "denied");
  };

  const sendFeedBack = async (classItem) => {
    const { value: feedBack } = await Swal.fire({
      input: "textarea",
      inputLabel: "Message",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });

    if (feedBack) {
      Swal.fire(feedBack);
      const sendData = {
        feedBack,
      };
      fetch(
        `https://dance-learning-school-server-mdsumonali372.vercel.app/classes/feedBack/${classItem._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(sendData),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          refecth();
          console.log(data);
        });
    }
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img className="h-64 w-full" src={classItem?.image} alt="Shoes" />
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
        <p className="font-bold text-xs">Price: ${classItem.price}</p>
        <p className="font-bold text-xs">
          Status: <span className="text-red-700">{classItem.status}</span>{" "}
        </p>
        {/* TODO: */}
        {/* <p className="font-bold text-xs">
          Feed Back: <span className="text-red-700">{classItem.feedBack}</span>
        </p> */}
        <div className="card-actions flex justify-between">
          <button
            disabled={
              classItem.status === "denied" || classItem.status === "approve"
            }
            onClick={() => handleApprove(classItem)}
            className="btn btn-primary btn-xs"
          >
            Approve
          </button>
          <button
            disabled={
              classItem.status === "approve" || classItem.status === "denied"
            }
            onClick={() => handleDenied(classItem)}
            className="btn btn-warning btn-xs"
          >
            Denied
          </button>
        </div>
        <div className="text-center">
          <button
            onClick={() => sendFeedBack(classItem)}
            className="btn btn-error block w-full btn-xs"
          >
            Send FeedBack
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
