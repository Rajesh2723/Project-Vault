import { useState } from 'react'
import ProjectForm from './components/ProjectForm'
import SearchBar from './components/SearchBar'
import ProjectList from './components/ProjectList'
import './App.css'

function App() {
  // Initial sample projects to showcase the application
  const initialProjects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce platform with real-time inventory management and secure payment processing.',
      image: 'https://via.placeholder.com/400x300?text=E-Commerce+Platform',
      tags: ['React', 'Node.js', 'MongoDB'],
      link: '#'
    },
    {
      id: 2,
      title: 'Mobile App UI Kit',
      description: 'Comprehensive UI kit designed for modern mobile applications with accessibility in mind.',
      image: 'https://via.placeholder.com/400x300?text=Mobile+App+UI',
      tags: ['Design', 'Figma', 'UX/UI'],
      link: '#'
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      description: 'Real-time analytics dashboard with interactive charts and data visualization.',
      image: 'https://via.placeholder.com/400x300?text=Analytics+Dashboard',
      tags: ['React', 'D3.js', 'Chart.js'],
      link: '#'
    }
  ]

  const [projects, setProjects] = useState(initialProjects)
  const [searchTerm, setSearchTerm] = useState('')
  const [nextId, setNextId] = useState(4)

  // Add new project to the list
  const handleAddProject = (newProject) => {
    const projectWithId = {
      ...newProject,
      id: nextId
    }
    setProjects([projectWithId, ...projects])
    setNextId(nextId + 1)
  }

  // Delete a project
  const handleDeleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id))
  }

  // Filter projects based on search term
  const filteredProjects = projects.filter(project => {
    const searchLower = searchTerm.toLowerCase()
    return (
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchLower))
    )
  })

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <h1>Creative Portfolio</h1>
          <p>Showcasing innovative projects and creative work</p>
        </div>
      </header>

      <main className="main-content">
        <div className="sidebar">
          <ProjectForm onAddProject={handleAddProject} />
        </div>

        <div className="content">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <ProjectList projects={filteredProjects} onDeleteProject={handleDeleteProject} />
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Creative Agency. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
