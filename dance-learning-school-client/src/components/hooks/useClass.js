import { useQuery } from "react-query";

const useClass = () => {
  const { data: classes = [], refetch } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch(
        "https://dance-learning-school-server-mdsumonali372.vercel.app/classes"
      );
      return res.json();
    },
  });
  return [classes, refetch];
};

export default useClass;
