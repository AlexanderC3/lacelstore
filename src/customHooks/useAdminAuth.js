import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { checkUserIsAdmin } from "../utils/index";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAdminAuth = () => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();

  useEffect(() => {
    if (currentUser && Array.isArray(currentUser.userRoles)) {
      const { userRoles } = currentUser;

      if (!userRoles.includes("admin")) {
        history.push("/login");
      }
    }
  }, [currentUser]);

  return currentUser;
};

export default useAdminAuth;
