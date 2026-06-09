import { render, screen } from '@testing-library/react'
import ProjectList from '../ProjectList'

const mockProjects = [
  {
    id: 1,
    title: 'Project 1',
    description: 'Description 1',
    image: 'https://via.placeholder.com/400x300',
    tags: ['React'],
    link: '#'
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'Description 2',
    image: 'https://via.placeholder.com/400x300',
    tags: ['Vue'],
    link: '#'
  }
]

const mockDeleteProject = jest.fn()

describe('ProjectList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders empty state when no projects provided', () => {
    render(<ProjectList projects={[]} onDeleteProject={mockDeleteProject} />)
    
    expect(screen.getByText(/no projects found/i)).toBeInTheDocument()
    expect(screen.getByText(/start by adding your first project/i)).toBeInTheDocument()
  })

  test('displays count of projects found', () => {
    render(<ProjectList projects={mockProjects} onDeleteProject={mockDeleteProject} />)
    
    expect(screen.getByText(/2 projects found/i)).toBeInTheDocument()
  })

  test('renders all project cards', () => {
    render(<ProjectList projects={mockProjects} onDeleteProject={mockDeleteProject} />)
    
    expect(screen.getByText('Project 1')).toBeInTheDocument()
    expect(screen.getByText('Project 2')).toBeInTheDocument()
  })

  test('displays correct count text for single project', () => {
    const singleProject = [mockProjects[0]]
    render(<ProjectList projects={singleProject} onDeleteProject={mockDeleteProject} />)
    
    expect(screen.getByText(/1 project found/i)).toBeInTheDocument()
  })
})
