import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useSelectedClass = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  // const token = localStorage.getItem("access-token");
  const { refetch, data: myclasses = [] } = useQuery({
    queryKey: ["myclasses", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/myclasses?email=${user?.email}`);
      console.log("res from axios", res);
      return res.data;
    },
  });

  return [myclasses, refetch];
};

export default useSelectedClass;
