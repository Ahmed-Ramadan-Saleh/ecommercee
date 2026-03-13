import { useEffect, useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../component/header/header";
import Footer from "../component/footer/footer";

import DataContext from "../../Context/ThemeContext";

const MainLayout = () => {
  const { Theme } = useContext(DataContext);
  const { pathname } = useLocation();

  // Restore in localstorge
  localStorage.setItem("theme", Theme);
  // Automatically scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      className={`${Theme} flex flex-col min-h-screen bg-texture overflow-x-hidden `}
    >
      <Header />

      <main className="flex-grow pt-[110px] lg:pt-[120px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
