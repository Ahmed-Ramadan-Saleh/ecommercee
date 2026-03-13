import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../compo/sidebar";
import Topbar from "../compo/topbar";
import DataContext from "../../Context/ThemeContext";

const AdminLayout = () => {
  const { Theme } = useContext(DataContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", Theme);
  }, [Theme]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className={`${Theme} min-h-screen bg-texture`}>
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="pt-16 lg:pl-64 transition-all duration-300">
        
        <Topbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default AdminLayout;