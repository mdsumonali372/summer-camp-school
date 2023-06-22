import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMyClass = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: myclass = [], refetch } = useQuery({
    queryKey: ["myclass"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myclasses/${user?.email}`);
      return res.data;
    },
  });

  return [myclass, refetch];
};

export default useMyClass;
