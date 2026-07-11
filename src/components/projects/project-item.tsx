import TechnologyList from "./technology-list";

export type ProjectItemProps = {
  title: string;
  description: string;
  technologies: string[];
  link: string;
};

export default function ProjectItem(props: ProjectItemProps) {
  return (
    <li>
      <article className="project-card">
        <h3 className="card-title">{props.title}</h3>
        <p className="card-description">{props.description}</p>
        <a href={props.link} target="_blank" className="project-link">
          <button className="project-btn">View Site</button>
        </a>
        <hr />
        <TechnologyList technologies={props.technologies} />
      </article>
    </li>
  );
}
