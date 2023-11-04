const express = require('express');
const path = require('path');
const cors = require('cors');

const superheroInfoData = require('../superhero_info.json');
const superheroPowersData = require('../superhero_powers.json');

const info = superheroInfoData;
const powers = superheroPowersData;

const app = express();
const port = process.env.PORT || 3002;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, '../client')));

// Item 2: Get all the powers for a given superhero ID
app.get('/api/superhero/powers/:id', (req, res) => {
    const superheroID = parseInt(req.params.id);

    // Check if the superhero ID is valid
    if (superheroID <= 0 || superheroID > powers.length) {
        return res.status(404).json({ error: 'Superhero not found' });
    }

    const superheroPowers = powers[superheroID - 1]; // Adjust for 0-based index

    if (!superheroPowers) {
        return res.status(404).json({ error: 'Powers for the superhero not found' });
    }

    // Remove the 'hero_names' property from the powers object
    delete superheroPowers.hero_names;

    res.json(superheroPowers);
});

// Item 3: Get all available publisher names
function getAllPublisherNames() {
    const publishers = [...new Set(info.map((hero) => hero.publisher))];
    return publishers;
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