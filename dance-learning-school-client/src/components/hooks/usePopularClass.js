import { useQuery } from "react-query";

const usePopularClass = () => {
  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch(
        "https://dance-learning-school-server-mdsumonali372.vercel.app/popular-classes"
      );
      return res.json();
    },
  });
  return [classes];
};

export default usePopularClass;
