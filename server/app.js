import express from 'express';
import superheroInfoData from '../superhero_info.json' assert {type: "json"};
import superheroPowersData from '../superhero_powers.json' assert {type: "json"};

const info = superheroInfoData;
const powers = superheroPowersData;

const app = express();
const port = process.env.PORT || 3001;

// Item 2: Get all the powers for a given superhero ID
function getAllPowersForSuperhero(superheroID) {
    const superhero = info.find((hero) => hero.id === superheroID);
    if (superhero) {
        const superheroPowers = powers.filter((power) => power.superhero_id === superheroID);
        return {
            superhero: superhero,
            powers: superheroPowers,
        };
    }
    return null; // Superhero not found
}

// Item 3: Get all available publisher names
function getAllPublisherNames() {
    const publishers = [...new Set(info.map((hero) => hero.publisher))];
    return publishers; // Fixed the missing parenthesis here
}

// Item 4: Get the first n number of matching superhero IDs for a given search pattern matching a given information field
function match(field, pattern, n) {
    const matchingSuperheroes = info.filter((hero) => hero[field] && hero[field].includes(pattern));
    if (n && n <= matchingSuperheroes.length) {
        return matchingSuperheroes.slice(0, n).map((hero) => hero.id);
    }
    return matchingSuperheroes.map((hero) => hero.id);
}

// Item 1: Get all the superhero information for a given superhero ID
app.get('/api/superhero/:id', (req, res) => {
    const superheroID = parseInt(req.params.id);
    const superhero = info.find((hero) => hero.id === superheroID);
    if (superhero) {
        res.json(superhero);
    } else {
        res.status(404).json({ error: 'Superhero not found' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
