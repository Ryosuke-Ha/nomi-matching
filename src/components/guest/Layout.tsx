import React, { ReactNode, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
  const [open, setOpen] = useState(true);
  const menuItems = [
    { title: "飲み友達検索", icon: "search", path: "/search" },
    { title: "チャット機能", icon: "chat", path: "/chat" },
    { title: "決済機能", icon: "payment", path: "/payment" },
  ];

  return (
    <div className="layout-container">
      <div className={`sidebar ${open ? "open" : "closed"}`}>
        <Link to="/" className="menu-item sidebar-header">
          <i className="material-icons" style={{ color: "#fff" }}>
            home
          </i>
          {open && <span className="title">ホーム</span>}
          {!open && <div className="tooltip">ホーム</div>}
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
              <div className="tooltip">閉じる</div>
            </>
          ) : (
            <>
              <i className="material-icons" style={{ color: "#fff" }}>
                chevron_right
              </i>
              <div className="tooltip">開く</div>
            </>
          )}
        </div>
      </div>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
