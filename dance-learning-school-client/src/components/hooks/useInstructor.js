import { useQuery } from "react-query";

const useInstructor = () => {
  const { data: instructors = [], refetch } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await fetch(
        "https://dance-learning-school-server-mdsumonali372.vercel.app/popularinstructors"
      );
      return res.json();
    },
  });

  return [instructors, refetch];
};

export default useInstructor;
