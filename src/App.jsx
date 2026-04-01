import { useDispatch } from "react-redux";
import AppRoutes from "./routes/App.routes";
import { useEffect } from "react";
import { getUserMeDetails } from "./store/user/user.service";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserMeDetails());
  }, [dispatch]);
  return <AppRoutes />;
};

export default App;
