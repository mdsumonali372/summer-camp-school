import usePopularInstructor from "../../../hooks/usePopularInstructor";

const PopuLarInstructor = () => {
  const [instructor] = usePopularInstructor();
  return (
    <div>
      <h2 className="text-3xl font-bold mb-3 px-10 md:px-0">
        Popular Instructor
      </h2>
      <div className="grid grid-cols-1 px-10 md:px-0 md:grid-cols-2 lg:grid-cols-3 gap-4 my-20">
        {instructor.map((instructorList) => (
          <div
            key={instructorList._id}
            className="card w-full md:w-96 bg-base-100 shadow-xl"
          >
            <figure>
              <img
                className="h-72 w-full"
                src={instructorList.profilePicture}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{instructorList.instructorName}</h2>
              <p>Total Students: {instructorList.totalStudents}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopuLarInstructor;
