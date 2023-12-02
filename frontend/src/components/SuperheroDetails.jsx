// SuperheroDetails.jsx
import React, { useState } from 'react';

const SuperheroDetails = ({ superhero }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const DDGSearch = () => {
        const searchQuery = `${superhero.name} ${superhero.Publisher}`;
        const searchURL = `https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`;

        window.open(searchURL, '_blank');
    };

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded); // Toggle the value
    };

    return (
        <div className="superhero-container">
            <div className="superhero-header">
                <h2>{superhero.name}</h2>
                <p>{superhero.Publisher}</p>
                <button onClick={handleToggleExpand} className='btn btn-block'>
                    {isExpanded ? 'Collapse' : 'Expand'}
                </button>
            </div>

            {isExpanded && (
                <div className="superhero-details">
                    {Object.entries(superhero).map(([key, value]) => (
                        <div key={key} className='attribute'>
                            <strong>{key}:</strong> {value}
                        </div>
                    ))}
                </div>
            )}
            <button onClick={DDGSearch} className='btn btn-block'>Search on DDG</button>
        </div>
    );
};

export default SuperheroDetails;
