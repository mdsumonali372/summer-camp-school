import { Link, Outlet } from "react-router-dom";
import classIcons from "../../assets/class.svg";
import homeIcon from "../../assets/home.svg";
import moneyIcon from "../../assets/money.svg";
import userIcon from "../../assets/user.svg";
import useAuth from "../../components/hooks/useAuth";
import useRole from "../../components/hooks/useRole";

const DashBoard = () => {
  const { user } = useAuth();
  const [isAdmin] = useRole();
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-white">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-orange-300 text-base-content">
            {user && (
              <div className=" text-center">
                <div className="avatar text-center">
                  <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={user?.photoURL} />
                  </div>
                </div>
                <h2 className="font-bold">{user?.displayName}</h2>
              </div>
            )}
            {/* Sidebar content here */}
            {isAdmin.role === "admin" && (
              <>
                <li>
                  <Link className="flex" to="/dashboard/manageusers">
                    {" "}
                    <img className="w-9" src={userIcon} alt="" /> Manage Users
                  </Link>
                </li>
                <li>
                  <Link className="flex" to="/dashboard/manageclass">
                    {" "}
                    <img className="w-9" src={classIcons} alt="" />
                    Manage Class
                  </Link>
                </li>
              </>
            )}
            {isAdmin.role === "instructor" && (
              <>
                <li>
                  <Link className="flex" to="/dashboard/addclass">
                    <img className="w-9" src={classIcons} alt="" />
                    Add Class
                  </Link>
                </li>
                <li>
                  <Link className="flex " to="/dashboard/myclass">
                    <img className="w-9" src={classIcons} alt="" /> My classes
                  </Link>
                </li>
              </>
            )}
            {isAdmin.role === "student" && (
              <>
                <li>
                  <Link className="flex" to="/dashboard/myselectedclass">
                    <img className="w-9" src={classIcons} alt="" /> My Selected
                    Class
                  </Link>
                </li>
                <li>
                  <Link className="flex" to="/dashboard/myenrolledclass">
                    <img className="w-9" src={classIcons} alt="" /> My Enrolled
                    Class
                  </Link>
                </li>
                <li>
                  <Link className="flex" to="/dashboard/paymenthistory">
                    <img className="w-9" src={moneyIcon} alt="" /> Payment
                    History
                  </Link>
                </li>
              </>
            )}
            <div className="divider"></div>
            <ul>
              <li>
                <Link className="flex" to="/">
                  <img className="w-9" src={homeIcon} alt="" />
                  Home
                </Link>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
