import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
  const location = useLocation();
  const { userLoading, authChecked, userMe } = useSelector(
    (state) => state.user,
  );
  const hasUser = !!userMe && Object.keys(userMe).length > 0;

  if (!authChecked || userLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Checking session...
      </div>
    );
  }

  if (!hasUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export const PublicRoute = () => {
  const { userLoading, authChecked, userMe } = useSelector(
    (state) => state.user,
  );
  const hasUser = !!userMe && Object.keys(userMe).length > 0;

  if (!authChecked || userLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Checking session...
      </div>
    );
  }

  if (hasUser) {
    return <Navigate to="/feed" replace />;
  }

  return <Outlet />;
};
