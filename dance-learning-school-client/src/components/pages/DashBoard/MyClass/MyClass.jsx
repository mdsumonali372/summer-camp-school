import useMyClass from "../../../hooks/useMyClass";
import MyClassCard from "./MyClassCard";

const MyClass = () => {
  const [myclass] = useMyClass();
  return (
    <div className="mt-10 mb-20">
      <h2 className="text-center font-bold text-2xl">My Class</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
        {myclass.map((classItem) => (
          <MyClassCard key={classItem._id} classItem={classItem}></MyClassCard>
        ))}
      </div>
    </div>
  );
};

export default MyClass;
