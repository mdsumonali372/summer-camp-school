import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useEnrolled = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: enrolled = [], refetch } = useQuery({
    queryKey: ["enrolled"],
    queryFn: async () => {
      const res = await axiosSecure(
        `https://dance-learning-school-server-mdsumonali372.vercel.app/myenrolledclasses/${user?.email}`
      );
      return res.data;
    },
  });
  return [enrolled, refetch];
};

export default useEnrolled;
