import userRoutes from "./userRoutes";
import adminRoutes from "./adminRoutes";

const routes = [...userRoutes, ...adminRoutes];

export default routes;
