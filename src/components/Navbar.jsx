import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  IconStar,
  IconHome,
  IconBook,
  IconCards,
  IconChart,
} from "./icons.jsx";

const links = [
  { to: "/", label: "Home", icon: <IconHome />, end: true },
  { to: "/study", label: "Study", icon: <IconBook /> },
  { to: "/flashcard", label: "Flashcards", icon: <IconCards /> },
  { to: "/progress", label: "Progress", icon: <IconChart /> },
];

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <IconStar style={{ width: 18, height: 18, color: "#fff" }} />
          </span>
          <span className="brand-name">
            American Dream Quiz
            <small>Citizenship Test Prep</small>
          </span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              {l.icon}
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
