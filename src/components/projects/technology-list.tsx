import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const TECHNOLOGY_THRESHOLD = 7;

export default function TechnologyList(props: { technologies: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const technologyList = expanded
    ? props.technologies
    : props.technologies.slice(0, TECHNOLOGY_THRESHOLD);

  function handleShowMore() {
    setExpanded((prev) => !prev);
  }

  return (
    <button onClick={handleShowMore} className="technology-list-btn">
      <div className="technology-list-container">
        <ul className="technology-list">
          {technologyList.map((tech, ind) => (
            <li className="technology-item" key={ind}>
              {tech}
            </li>
          ))}
        </ul>
        {props.technologies.length > TECHNOLOGY_THRESHOLD && (
          <IoIosArrowForward className={expanded ? "show-more expanded" : "show-more"} />
        )}
      </div>
    </button>
  );
}
