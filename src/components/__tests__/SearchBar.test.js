import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '../SearchBar'

const mockOnSearchChange = jest.fn()

describe('SearchBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders search input field', () => {
    render(<SearchBar searchTerm="" onSearchChange={mockOnSearchChange} />)
    
    expect(screen.getByPlaceholderText(/search projects/i)).toBeInTheDocument()
  })

  test('calls onSearchChange when input value changes', async () => {
    const user = userEvent.setup()
    render(<SearchBar searchTerm="" onSearchChange={mockOnSearchChange} />)
    
    const input = screen.getByPlaceholderText(/search projects/i)
    await user.type(input, 'React')
    
    expect(mockOnSearchChange).toHaveBeenCalledTimes(5) // one call per character
    expect(mockOnSearchChange).toHaveBeenLastCalledWith('React')
  })

  test('displays clear button when search term is not empty', () => {
    render(<SearchBar searchTerm="React" onSearchChange={mockOnSearchChange} />)
    
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
  })

  test('does not display clear button when search term is empty', () => {
    render(<SearchBar searchTerm="" onSearchChange={mockOnSearchChange} />)
    
    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument()
  })

  test('clears search when clear button is clicked', async () => {
    const user = userEvent.setup()
    render(<SearchBar searchTerm="React" onSearchChange={mockOnSearchChange} />)
    
    const clearButton = screen.getByRole('button', { name: /clear/i })
    await user.click(clearButton)
    
    expect(mockOnSearchChange).toHaveBeenCalledWith('')
  })
})
