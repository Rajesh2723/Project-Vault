import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectForm from '../ProjectForm'

const mockAddProject = jest.fn()

describe('ProjectForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders form with all required fields', () => {
    render(<ProjectForm onAddProject={mockAddProject} />)
    
    expect(screen.getByLabelText(/project title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/image url/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/tags/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/project link/i)).toBeInTheDocument()
  })

  test('renders submit button', () => {
    render(<ProjectForm onAddProject={mockAddProject} />)
    
    expect(screen.getByRole('button', { name: /add project/i })).toBeInTheDocument()
  })

  test('shows validation error when title is empty', async () => {
    const user = userEvent.setup()
    render(<ProjectForm onAddProject={mockAddProject} />)
    
    const submitButton = screen.getByRole('button', { name: /add project/i })
    await user.click(submitButton)
    
    expect(screen.getByText(/project title is required/i)).toBeInTheDocument()
    expect(mockAddProject).not.toHaveBeenCalled()
  })

  test('shows validation error for invalid image URL', async () => {
    const user = userEvent.setup()
    render(<ProjectForm onAddProject={mockAddProject} />)
    
    const titleInput = screen.getByLabelText(/project title/i)
    const descriptionInput = screen.getByLabelText(/description/i)
    const imageInput = screen.getByLabelText(/image url/i)
    const tagsInput = screen.getByLabelText(/tags/i)
    
    await user.type(titleInput, 'Test Project')
    await user.type(descriptionInput, 'Test Description')
    await user.type(imageInput, 'not-a-valid-url')
    await user.type(tagsInput, 'React')
    
    const submitButton = screen.getByRole('button', { name: /add project/i })
    await user.click(submitButton)
    
    expect(screen.getByText(/please enter a valid image url/i)).toBeInTheDocument()
    expect(mockAddProject).not.toHaveBeenCalled()
  })

  test('submits form with valid data', async () => {
    const user = userEvent.setup()
    render(<ProjectForm onAddProject={mockAddProject} />)
    
    const titleInput = screen.getByLabelText(/project title/i)
    const descriptionInput = screen.getByLabelText(/description/i)
    const imageInput = screen.getByLabelText(/image url/i)
    const tagsInput = screen.getByLabelText(/tags/i)
    
    await user.type(titleInput, 'Test Project')
    await user.type(descriptionInput, 'Test Description')
    await user.type(imageInput, 'https://via.placeholder.com/400x300')
    await user.type(tagsInput, 'React, JavaScript')
    
    const submitButton = screen.getByRole('button', { name: /add project/i })
    await user.click(submitButton)
    
    expect(mockAddProject).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Test Project',
        description: 'Test Description',
        image: 'https://via.placeholder.com/400x300',
        tags: ['React', 'JavaScript']
      })
    )
  })

  test('clears form after successful submission', async () => {
    const user = userEvent.setup()
    render(<ProjectForm onAddProject={mockAddProject} />)
    
    const titleInput = screen.getByLabelText(/project title/i)
    const descriptionInput = screen.getByLabelText(/description/i)
    const imageInput = screen.getByLabelText(/image url/i)
    const tagsInput = screen.getByLabelText(/tags/i)
    
    await user.type(titleInput, 'Test Project')
    await user.type(descriptionInput, 'Test Description')
    await user.type(imageInput, 'https://via.placeholder.com/400x300')
    await user.type(tagsInput, 'React')
    
    const submitButton = screen.getByRole('button', { name: /add project/i })
    await user.click(submitButton)
    
    expect(titleInput).toHaveValue('')
    expect(descriptionInput).toHaveValue('')
    expect(imageInput).toHaveValue('')
    expect(tagsInput).toHaveValue('')
  })
})
