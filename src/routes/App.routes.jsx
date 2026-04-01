import Mainlayout from "@/layouts/Mainlayout";
import Auth from "@/pages/Auth/Auth";
import Feed from "@/pages/Feed/Feed";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute, PublicRoute } from "./RouteGuards.route.jsx";

const AppRoutes = () => {


  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<Mainlayout />}>
          <Route path="/" element={<Navigate to="/feed" replace />} />
          <Route path="/feed" element={<Feed />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
