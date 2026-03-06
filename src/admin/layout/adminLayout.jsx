import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../compo/sidebar"; // Adjust path as needed (e.g., ../components/Sidebar)
import Topbar from "../compo/topbar";   // Adjust path as needed (e.g., ../components/Topbar)
import DataContext from "../../Context/ThemeContext";

const AdminLayout = () => {
  const { Theme } = useContext(DataContext);
// onToggleSidebar
const [onToggleSidebar, setonToggleSidebar] = useState(true);
  // Persist theme choice to localStorage
  useEffect(() => {
    localStorage.setItem("theme", Theme);
  }, [Theme]);

  return (
    <div className={`${Theme} flex min-h-screen bg-texture overflow-x-hidden`}>
      
      {/* Sidebar - Fixed on the left */}
      <Sidebar onToggleSidebar={onToggleSidebar} />

      {/* Main Content Area - Pushed right on desktop to avoid sidebar overlap */}
      <div className="flex-1 flex flex-col min-h-screen ">
        
        {/* Top Header */}
        <Topbar onToggleSidebar={onToggleSidebar} setonToggleSidebar={setonToggleSidebar} />
        
        {/* Page Content */}
        <main className="flex-grow p-4 sm:p-6 lg:p-8 mt-20">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default AdminLayout;