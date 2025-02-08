// import Navbar from "../components/ui/NavBar";
// import Footer from "../components/ui/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="">
      {/* Navbar همیشه در بالای صفحه باشد */}
      {/* <Navbar /> */}

      <Outlet />

      {/* Footer همیشه در پایین صفحه باشد */}
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
