import "./App.css";
import Header from "./components/header/header";
import AboutMeSection from "./components/about-me/about";
import ExperienceSection from "./components/experience/experience";
import ProjectsSection from "./components/projects/projects";
import ContactForm from "./components/contact/contact";

export default function App() {
  return (
    <>
      <Header />
      <div id="content">
        <main>
          <AboutMeSection />
        </main>
        <ExperienceSection />
        <ProjectsSection />
        <ContactForm />
      </div>
    </>
  );
}
