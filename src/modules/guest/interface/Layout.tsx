import React, { ReactNode, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
  const [open, setOpen] = useState(true);
  const menuItems = [
    { title: "SEARCH", icon: "search", path: "/search" },
    { title: "CHAT", icon: "chat", path: "/chat" },
  ];

  return (
    <>
      {/* Mobile header */}
      <Link to="/" className="mobile-header">
        <span className="mobile-title">
          <i className="material-icons">restaurant</i>Nomi Matching
        </span>
      </Link>
      <div className="layout-container">
        <div className={`sidebar ${open ? "open" : "closed"}`}>
          <Link to="/" className="menu-item sidebar-header">
            <i className="material-icons" style={{ color: "#fff" }}>
              home
            </i>
            {open && <span className="title">HOME</span>}
            {!open && <div className="tooltip">HOME</div>}
          </Link>
          <ul>
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <Link to={item.path} className="menu-item">
                  <i className="material-icons">{item.icon}</i>
                  {open && <span className="title">{item.title}</span>}
                  {!open && <div className="tooltip">{item.title}</div>}
                </Link>
              </li>
            ))}
          </ul>
          <div className="toggle-button" onClick={() => setOpen(!open)}>
            {open ? (
              <>
                <i className="material-icons" style={{ color: "#fff" }}>
                  chevron_left
                </i>
                <div className="tooltip">CLOSE</div>
              </>
            ) : (
              <>
                <i className="material-icons" style={{ color: "#fff" }}>
                  chevron_right
                </i>
                <div className="tooltip">OPEN</div>
              </>
            )}
          </div>
        </div>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
