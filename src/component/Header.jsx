import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("home");
  
  
  useEffect(() => {
    // Extract active item from query parameter
    const searchParams = new URLSearchParams(location.search);
    const active = searchParams.get("active");
    if (active) {
      setActiveItem(active);
    }
  }, [location.search]);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <div className="header">
      <div className="logo-img">
        <img src="https://i.pinimg.com/474x/90/03/a6/9003a6c183a8d8b77d2d9a4e2e21526b.jpg" alt="logo"></img>
      </div>

      <nav className="side-nav">
        <ul className="nav-menu">
          <li className={`nav-item ${activeItem === "home" && "active"}`}>
            <Link
              to={{ pathname: "/", search: "?active=home" }}
              className="menu-text"
              onClick={() => handleItemClick("home")}
            >
              Home
            </Link>
          </li>
          <li className={`nav-item ${activeItem === "favorite" && "active"}`}>
            <Link
              to={{ pathname: "/favorite", search: "?active=favorite" }}
              className="menu-text"
              onClick={() => handleItemClick("favorite")}
            >
              Favorites
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
