import { useState } from 'react'
import './ProjectForm.css'

function ProjectForm({ onAddProject }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tags: '',
    link: ''
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required'
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Project image URL is required'
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = 'Please enter a valid image URL'
    }

    if (!formData.tags.trim()) {
      newErrors.tags = 'At least one tag is required'
    }

    return newErrors
  }

  const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const newProject = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    }

    onAddProject(newProject)

    // Reset form
    setFormData({
      title: '',
      description: '',
      image: '',
      tags: '',
      link: ''
    })
    setErrors({})
  }

  return (
    <div className="project-form-container">
      <h2>Add New Project</h2>
      <form className="project-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Project Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter project title"
            className={errors.title ? 'input-error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your project"
            rows="4"
            className={errors.description ? 'input-error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL *</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
            className={errors.image ? 'input-error' : ''}
          />
          {errors.image && <span className="error-message">{errors.image}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated) *</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="React, Node.js, MongoDB"
            className={errors.tags ? 'input-error' : ''}
          />
          {errors.tags && <span className="error-message">{errors.tags}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="link">Project Link</label>
          <input
            type="text"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="https://example.com (optional)"
          />
        </div>

        <button type="submit" className="submit-button">
          Add Project
        </button>
      </form>
    </div>
  )
}

export default ProjectForm
