import ProjectCard from './ProjectCard'
import './ProjectList.css'

function ProjectList({ projects, onDeleteProject }) {
  if (projects.length === 0) {
    return (
      <div className="empty-state">
        <h2>No projects found</h2>
        <p>Start by adding your first project using the form on the left!</p>
      </div>
    )
  }

  return (
    <div className="project-list-container">
      <div className="projects-count">
        {projects.length} {projects.length === 1 ? 'project' : 'projects'} found
      </div>
      <div className="projects-grid">
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onDelete={onDeleteProject}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectList
