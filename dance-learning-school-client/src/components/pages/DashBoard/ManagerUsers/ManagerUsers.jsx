import Swal from "sweetalert2";
import useUser from "../../../hooks/useUser";

const ManagerUsers = () => {
  const [users, refetch] = useUser();

  //   console.log(users && users);
  const roleUpdateFunction = (userList, role, roleName) => {
    fetch(
      `https://dance-learning-school-server-mdsumonali372.vercel.app/changeRole/${userList?._id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ role: role }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${userList.name} made an ${roleName}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  const handleMakeAdmin = (userList, role) => {
    console.log(userList._id);
    roleUpdateFunction(userList, role, "admin");
  };
  const handleMakeInstructor = (userList, role) => {
    roleUpdateFunction(userList, role, "instructor");
  };
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Role</th>
            <th>Make Admin</th>
            <th>Make Instructor</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {users &&
            users?.map((userList, index) => (
              <tr key={userList._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={userList?.userImage} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{userList?.name}</div>
                    </div>
                  </div>
                </td>
                <td>{userList?.email}</td>
                <td>{userList?.role ? userList?.role : "student"}</td>
                <td>
                  <button
                    onClick={() => handleMakeAdmin(userList, "admin")}
                    className="btn btn-ghost btn-xs"
                    disabled={
                      userList.role == "admin" || userList.role == "instructor"
                    }
                  >
                    Make Admin
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleMakeInstructor(userList, "instructor")}
                    className="btn btn-ghost btn-xs"
                    disabled={
                      userList.role == "admin" || userList.role == "instructor"
                    }
                  >
                    Make Instructor
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerUsers;
