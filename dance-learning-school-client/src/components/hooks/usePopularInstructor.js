import { useQuery } from "react-query";

const usePopularInstructor = () => {
  const { data: instructor = [] } = useQuery({
    queryKey: ["instructor"],
    queryFn: async () => {
      const res = await fetch(
        "https://dance-learning-school-server-mdsumonali372.vercel.app/popular-instructors"
      );
      return res.json();
    },
  });
  return [instructor];
};

export default usePopularInstructor;
