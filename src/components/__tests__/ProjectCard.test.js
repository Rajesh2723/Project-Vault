import { render, screen } from '@testing-library/react'
import ProjectCard from '../ProjectCard'

const mockProject = {
  id: 1,
  title: 'Test Project',
  description: 'This is a test project description',
  image: 'https://via.placeholder.com/400x300',
  tags: ['React', 'JavaScript'],
  link: 'https://example.com'
}

const mockDeleteFunction = jest.fn()

describe('ProjectCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders project card with correct information', () => {
    render(<ProjectCard project={mockProject} onDelete={mockDeleteFunction} />)
    
    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('This is a test project description')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
  })

  test('displays project image with correct alt text', () => {
    render(<ProjectCard project={mockProject} onDelete={mockDeleteFunction} />)
    
    const image = screen.getByAltText('Test Project')
    expect(image).toHaveAttribute('src', mockProject.image)
  })

  test('renders delete button and calls handler on click', () => {
    render(<ProjectCard project={mockProject} onDelete={mockDeleteFunction} />)
    
    const deleteButton = screen.getByRole('button', { name: /delete/i })
    expect(deleteButton).toBeInTheDocument()
    
    deleteButton.click()
    expect(mockDeleteFunction).toHaveBeenCalledWith(mockProject.id)
  })

  test('renders project link when provided', () => {
    render(<ProjectCard project={mockProject} onDelete={mockDeleteFunction} />)
    
    const link = screen.getByRole('link', { name: /view project/i })
    expect(link).toHaveAttribute('href', mockProject.link)
    expect(link).toHaveAttribute('target', '_blank')
  })

  test('does not render project link when link is not provided', () => {
    const projectWithoutLink = { ...mockProject, link: '' }
    render(<ProjectCard project={projectWithoutLink} onDelete={mockDeleteFunction} />)
    
    const link = screen.queryByRole('link', { name: /view project/i })
    expect(link).not.toBeInTheDocument()
  })
})
