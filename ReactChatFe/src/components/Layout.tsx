import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-transparent dark:from-slate-800 dark:via-slate-900 dark:to-transparent opacity-70"></div>
      <div className="relative flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
