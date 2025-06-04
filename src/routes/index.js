import UserRoutes from "./userRoutes";
import AdminRoutes from "./adminRoutes";

function AppRoutes() {
  return (
    <>
      <UserRoutes />
      {console.log("asdhfd")}
      <AdminRoutes />
    </>
  );
}

export default AppRoutes;
