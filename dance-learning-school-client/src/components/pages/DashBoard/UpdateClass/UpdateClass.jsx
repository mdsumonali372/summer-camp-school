import { useParams } from "react-router-dom";

const UpdateClass = () => {
  const id = useParams();
  fetch(
    `https://dance-learning-school-server-mdsumonali372.vercel.app/myclassesupdate/${id}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  return (
    <div>
      <h2>Update:</h2>
    </div>
  );
};

export default UpdateClass;
