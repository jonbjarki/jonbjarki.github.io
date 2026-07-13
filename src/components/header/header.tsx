import "./header.css";

export default function Header() {
  return (
    <header>
      <div id="skip-link">
        <a href="#about">Skip to Main Content</a>
      </div>
      <nav aria-label="Main navigation">
        <a className="nav-item" href="#about">
          Home
        </a>
        <a className="nav-item" href="#experience">
          Experience
        </a>
        <a className="nav-item" href="#projects">
          Projects
        </a>
        <a className="nav-item" href="#contact">
          Contact
        </a>
      </nav>
    </header>
  );
}
