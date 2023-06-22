import { useQuery } from "react-query";

const useAllClass = () => {
  const { data: classes = [], refetch } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch(
        "https://dance-learning-school-server-mdsumonali372.vercel.app/classesPage"
      );
      return res.json();
    },
  });

  return [classes, refetch];
};

export default useAllClass;
