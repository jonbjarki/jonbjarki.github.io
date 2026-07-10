import "./about.css";

export default function AboutMeSection() {
  return (
    <section id="about" aria-label="about me">
      <p id="introduction">Hi, my name is</p>
      <h1 id="name">Jón Bjarki</h1>
      <h2 id="title">Striving to improve lives with technology</h2>
      <p id="description">
        As a full-stack software engineer, I work hard to build accessible, easy-to-use software
        that has a real impact on people's lives.
      </p>
      <a href="#contact">
        <button id="contact-btn">Contact Me</button>
      </a>
    </section>
  );
}
