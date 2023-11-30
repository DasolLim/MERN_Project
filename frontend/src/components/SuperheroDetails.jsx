// Search output
import React from 'react';

const SuperheroDetails = ({ superhero }) => {
    return (
        <div className='superhero-details'>
            {Object.entries(superhero).map(([key, value]) => (
                <div key={key} className='attribute'>
                    <strong>{key}:</strong> {value}
                </div>
            ))}
        </div>
    );
};

export default SuperheroDetails;
