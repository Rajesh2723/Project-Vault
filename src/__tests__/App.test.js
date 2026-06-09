import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App Component', () => {
  test('renders the application header', () => {
    render(<App />)
    
    const header = screen.getByText('Creative Portfolio')
    expect(header).toBeInTheDocument()
  })
})
