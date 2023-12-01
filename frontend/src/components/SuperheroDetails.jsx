// Search output
import React from 'react';

const SuperheroDetails = ({ superhero }) => {
    const handleSearchOnDDG = () => {
        const searchQuery = `${superhero.name} ${superhero.Publisher}`;
        const ddgSearchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`;

        // Open a new tab with DDG search page
        window.open(ddgSearchUrl, '_blank');
    };

    return (
        <div className="superhero-container">
            {Object.entries(superhero).map(([key, value]) => (
                <div key={key} className='attribute'>
                    <strong>{key}:</strong> {value}
                </div>
            ))}
            <button onClick={handleSearchOnDDG} className='btn btn-block'>Search on DDG</button>
        </div>
    );
};

export default SuperheroDetails;
