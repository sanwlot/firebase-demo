import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="container">
      <h1>Header</h1>
      <Outlet />
      <h1>Footer</h1>
    </div>
  );
}

export default Layout;
