import { useEffect } from "react";
import AuthHelper from "./AuthHelper";
const ProtectedRoute = ({ router, children, protectedRoutes }) => {
  let isAuthenticated = AuthHelper.isAuth();
  console.log(isAuthenticated);
  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
    if (!isAuthenticated && pathIsProtected) {
      // Redirect route, you can point this to /login
      router.push("/login");
    }
  }, [isAuthenticated, pathIsProtected]);

  return children;
};

export default ProtectedRoute;
