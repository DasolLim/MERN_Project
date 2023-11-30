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

const SearchForm = ({ onSubmit, onInputChange, searchTerm, searchCategory, onCategoryChange }) => {
    return (
        <form onSubmit={onSubmit}>
            <input type="text" value={searchTerm} onChange={onInputChange} placeholder="Search..." />
            <select value={searchCategory} onChange={(e) => onCategoryChange(e.target.value)}>
                <option value="name">Name</option>
                <option value="race">Race</option>
                <option value="publisher">Publisher</option>
                <option value="power">Power</option>
            </select>
            <label htmlFor="search-category">Search Category: </label>
            <span id="search-category">{getSearchCategoryLabel(searchCategory)}</span>
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;
