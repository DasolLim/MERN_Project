// SearchForm.jsx
import React from 'react';

// Helper function to get the label for the selected search category
const getSearchCategoryLabel = (searchCategory) => {
    switch (searchCategory) {
        case 'name':
            return 'Name';
        case 'race':
            return 'Race';
        case 'publisher':
            return 'Publisher';
        case 'power':
            return 'Power';
        default:
            return '';
    }
};

const SearchForm = ({ onSubmit, onInputChange, searchTerm, searchCategory, onCategoryChange, onResultInputChange, resultCount }) => {
    return (
        <form onSubmit={onSubmit}>
            <input type="text" value={searchTerm} onChange={onInputChange} placeholder="Search..." />
            <select value={searchCategory} onChange={(e) => onCategoryChange(e.target.value)}>
                <option value="name">Name</option>
                <option value="race">Race</option>
                <option value="publisher">Publisher</option>
                <option value="power">Power</option>
            </select>
            <input
                type="number"
                id="result-count"
                value={resultCount}
                onChange={(e) => onResultInputChange(e.target.value)}
                min="1" // Minimum value
            />
            <button type="submit" className='btn btn-block'>Search</button>
        </form>
    );
};

export default SearchForm;
