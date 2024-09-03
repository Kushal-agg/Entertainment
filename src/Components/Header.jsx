import React from "react";
import { NavLink, Link } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import "./Home.scss"; // Import the SCSS file for styles

const Header = () => {
  return (
    <nav className="header">
      <img
        id="home"
        src="https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/8f/80/18/8f801836-5772-212d-970e-34703cc29fad/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg"
        alt="Logo"
      />
      <div className="nav-links">
        <NavLink exact to="/" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/tvshows" activeClassName="active">
          TV Shows
        </NavLink>
        <NavLink to="/movies" activeClassName="active">
          Movies
        </NavLink>
        <Link>My List</Link>
      </div>
      <NavLink to="/find">
        <ImSearch />
      </NavLink>
    </nav>
  );
};

export default Header;
