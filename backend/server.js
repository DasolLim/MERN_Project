const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

// Importing superhero json files
const superheroInfoData = require('./data/superhero_info.json');
const superheroPowersData = require('./data/superhero_powers.json');

const info = superheroInfoData;
const powers = superheroPowersData;

// Connecting to MongoDB database
connectDB();

// Express is a web application framework for Node.js
// Creating new application with defined routes to handle HTTP request and response
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Item 1: Get all the superhero information for a given superhero ID
app.get('/api/superhero/:id', (req, res) => {
    const superheroID = parseInt(req.params.id);
    const superhero = superheroInfoData.find((hero) => hero.id === superheroID);

    if (superhero) {
        res.json(superhero);
    } else {
        res.status(404).json({ error: 'Superhero not found' });
    }
});

// Item 2: Get all the powers for a given superhero ID
app.get('/api/superhero/powers/:id', (req, res) => {
    const superheroID = parseInt(req.params.id);

    // Check if the superhero ID is valid
    if (superheroID < 0 || superheroID >= superheroInfoData.length) {
        return res.status(404).json({ error: 'Superhero not found' });
    }

    const superheroName = superheroInfoData[superheroID].name;

    // Find powers for the superhero by name
    const superheroPowers = superheroPowersData.find(hero => hero.hero_names === superheroName);

    // Check if powers are found
    if (!superheroPowers) {
        return res.status(404).json({ error: 'Powers for the superhero not found' });
    }

    // Filter out powers that are not true
    const truePowers = Object.keys(superheroPowers).filter(power => superheroPowers[power] === 'True');

    if (truePowers.length === 0) {
        return res.json({ powers: 'No Powers' });
    }

    res.json({ powers: truePowers });
});

// Item 3: Get all available publisher names
app.get('/api/publishers', (req, res) => {
    // Extract unique publisher names from the data
    const publisherNames = [...new Set(superheroInfoData.map(superhero => superhero.Publisher))];

    // Respond with the list of publisher names
    res.json(publisherNames);
});

const stringSimilarity = require('string-similarity');

// Item 4: Get the first n number of matching superhero IDs for a given search pattern matching a given information field (name, race, or publisher)
app.get('/api/search', (req, res) => {
    try {
        const { field, pattern, n } = req.query;

        if (!field || !pattern) {
            return res.status(400).json({ error: 'Both field and pattern are required parameters.' });
        }

        // Validation for the 'n' parameter
        if (n && (isNaN(n) || n < 1 || n > 100)) {
            return res.status(400).json({ error: 'Invalid value for parameter "n".' });
        }

        // Create a variable to store the field name to search
        let searchField;

        // Check the value of 'field' and set the corresponding search field
        if (field === 'name') {
            searchField = 'name';
        } else if (field === 'race') {
            searchField = 'Race';
        } else if (field === 'publisher') {
            searchField = 'Publisher';
        } else {
            return res.status(400).json({ error: 'Invalid field value.' });
        }

        const matchingSuperheroes = superheroInfoData.filter((superhero) => {
            const fieldValue = superhero[searchField] || '';

            // Soft matching logic: case-insensitive, ignore white-space, and tolerate up to two missing or different characters
            const normalizedFieldValue = fieldValue.toLowerCase().replace(/\s/g, ''); // Convert to lowercase and remove white-space
            const normalizedPattern = pattern.toLowerCase().replace(/\s/g, ''); // Convert to lowercase and remove white-space

            for (let i = 0; i < normalizedPattern.length; i++) {
                if (normalizedFieldValue.indexOf(normalizedPattern.substr(i)) !== -1) {
                    return true; // Soft match found
                }
            }

            return false;
        });

        // Restrict the number of results based on user input 'n'
        const limitedSuperheroes = n ? matchingSuperheroes.slice(0, parseInt(n, 10)) : matchingSuperheroes;

        res.json(limitedSuperheroes);
    } catch (error) {
        console.error('Error in search endpoint:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
        )
    );
} else {
    app.get('/', (req, res) => res.send('Please set to production'));
}

// overwrite express error handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));