import './SearchBar.css'

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search projects by title, description, or tags..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
          aria-label="Search projects"
        />
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </div>
      {searchTerm && (
        <button
          className="clear-search"
          onClick={() => onSearchChange('')}
          aria-label="Clear search"
        >
          Clear
        </button>
      )}
    </div>
  )
}

export default SearchBar
