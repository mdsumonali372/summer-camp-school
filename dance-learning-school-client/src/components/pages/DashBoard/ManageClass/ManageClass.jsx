import useClass from "../../../hooks/useClass";
import ClassCard from "./ClassCard";

const ManageClass = () => {
  const [classes] = useClass();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
      {classes.map((classItem) => (
        <ClassCard key={classItem._id} classItem={classItem}></ClassCard>
      ))}
    </div>
  );
};

export default ManageClass;
