import useInstructor from "../../hooks/useInstructor";

const Instructors = () => {
  const [instructors] = useInstructor();
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 px-10 md:px-0 md:grid-cols-2 lg:grid-cols-3 gap-4 my-20">
        {instructors.map((instructorList) => (
          <div
            key={instructorList._id}
            className="card w-full md:w-96 bg-base-100 shadow-xl"
          >
            <figure>
              <img
                className="h-72 w-full"
                src={instructorList.userImage}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{instructorList.name}</h2>
              <p>Email: {instructorList.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
