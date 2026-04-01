import Nav from "@/components/ui/Nav";
import { Outlet } from "react-router-dom";

const Mainlayout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

export default Mainlayout;
