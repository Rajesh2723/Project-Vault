import './ProjectCard.css'

function ProjectCard({ project, onDelete }) {
  return (
    <div className="project-card">
      <div className="project-image-container">
        <img src={project.image} alt={project.title} className="project-image" />
        <button
          className="delete-button"
          onClick={() => onDelete(project.id)}
          aria-label={`Delete ${project.title}`}
          title="Delete project"
        >
          ×
        </button>
      </div>
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
        {project.link && project.link !== '#' && (
          <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
            View Project →
          </a>
        )}
      </div>
    </div>
  )
}

export default ProjectCard
