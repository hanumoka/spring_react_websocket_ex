import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <div>
      <Header /> {/* 고정 헤더 */}
      <main>
        <Outlet /> {/* 여기에 각 페이지 컴포넌트가 렌더링 */}
      </main>
    </div>
  );
}

export default Layout;
