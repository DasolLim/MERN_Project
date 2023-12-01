// searchService.js
const BASE_URL = '/api/search?';

export const getSuperheroes = async (field, pattern, n) => {
    try {
        const response = await fetch(`${BASE_URL}field=${field}&pattern=${encodeURIComponent(pattern)}&n=${n}`);
        if (!response.ok) {
            throw new Error('Failed to fetch superheroes');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching superheroes:', error);
        throw error;
    }
};
