import "./projects.css";
import data from "../../data.json";
import type { ProjectItemProps } from "./project-item";
import ProjectItem from "./project-item";

export default function ProjectsSection() {
  const projects = data.projects satisfies ProjectItemProps[];
  return (
    <section id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title" className="section-title">
        Projects
      </h2>
      <ol id="projects-list">
        {projects.map((project, ind) => (
          <ProjectItem key={ind} {...project} />
        ))}
      </ol>
    </section>
  );
}
