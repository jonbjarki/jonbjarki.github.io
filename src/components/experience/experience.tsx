import "./experience.css";
import data from "../../data.json";

export default function ExperienceSection() {
  const experienceData = data.experience;
  const experience = experienceData.map((item) => {
    return { ...item, startDate: new Date(item.startDate), endDate: new Date(item.endDate) };
  }) satisfies ExperienceProps[];

  return (
    <section id="experience" aria-labelledby="experience-title">
      <h2 id="experience-title">My Experience</h2>
      <ol>
        {experience.map((item, ind) => (
          <ExperienceItem key={ind} {...item} />
        ))}
      </ol>
    </section>
  );
}

type ExperienceProps = {
  title: string;
  company: string;
  description: string;
  startDate: Date;
  endDate: Date;
};

function ExperienceItem(props: ExperienceProps) {
  const start = props.startDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const end = props.endDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <li>
      <article className="job-card">
        <div className="duration">
          {start} <div className="duration-line"></div> {end}
        </div>
        <div className="experience-body">
          <h3 className="card-title">{props.title}</h3>
          <p className="company">{props.company}</p>
          <p className="card-description">{props.description}</p>
        </div>
      </article>
    </li>
  );
}
