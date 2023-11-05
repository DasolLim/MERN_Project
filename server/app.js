const express = require('express');
const path = require('path');
const cors = require('cors');

const superheroInfoData = require('../superhero_info.json');
const superheroPowersData = require('../superhero_powers.json');

const info = superheroInfoData;
const powers = superheroPowersData;

// Initialize an empty array to store created lists
const createdLists = [];

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
app.get('/api/publishers', (req, res) => {
    // Extract unique publisher names from the data
    const publisherNames = [...new Set(superheroInfoData.map(superhero => superhero.Publisher))];

    // Respond with the list of publisher names
    res.json(publisherNames);
});

// Item 4: Get the first n number of matching superhero IDs for a given search pattern matching a given information field
app.get('/api/search', (req, res) => {
    const { field, pattern, n } = req.query;

    if (!field || !pattern) {
        return res.status(400).json({ error: 'Both field and pattern are required parameters.' });
    }

    const matchingSuperheroes = superheroInfoData.filter(superhero => {
        const fieldValue = superhero[field] || '';
        return fieldValue.toLowerCase().includes(pattern.toLowerCase());
    });

    const matchedIDs = matchingSuperheroes.map(superhero => superhero.id);

    if (n) {
        const limitedIDs = matchedIDs.slice(0, parseInt(n, 10));
        res.json(limitedIDs);
    } else {
        res.json(matchedIDs);
    }
});

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

// Item 5: Create a new list to save a list of superheroes with a given list name. Return an error if the name exists.
// Create a new list with a given name
app.post('/api/createList', (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: 'Name is required for creating a list.' });
    }

    // Check if the list name already exists
    if (createdLists.some(list => list.name === name)) {
        return res.status(400).json({ error: 'List with the same name already exists.' });
    }

    // Assuming you have an array of superhero IDs to include in the list
    const superheroIDs = [1, 2, 3]; // Replace with the actual IDs

    // Create a new list object with a name and superhero IDs
    const newList = {
        name,
        superheroes: superheroIDs,
    };

    // Add the new list to the createdLists array
    createdLists.push(newList);

    res.json({ message: 'List created successfully.', lists: createdLists });
});

//Item 6: Save a list of superhero IDs to a given list name. Return an error if the list name does not exist. Replace existing superhero IDs with new values if the list exists.
// Save a list of superhero IDs to a given list name
app.put('/api/saveList', (req, res) => {
    const { name, superheroIDs } = req.query;

    if (!name || !superheroIDs) {
        return res.status(400).json({ error: 'Both name and superheroIDs are required for saving a list.' });
    }

    // Find the list by name
    const existingList = createdLists.find(list => list.name === name);

    if (!existingList) {
        return res.status(404).json({ error: 'List with the specified name does not exist.' });
    }

    // Update the superhero IDs in the existing list
    existingList.superheroes = superheroIDs.split(',').map(id => parseInt(id, 10)); // Split and parse IDs as integers

    res.json({ message: 'List updated successfully.' });
});

// Item 7: Get the list of superhero IDs for a given list
app.get('/api/getList', (req, res) => {
    const listName = req.query.name; // Get the list name from the query parameters

    if (!listName) {
        return res.status(400).json({ error: 'List name is required.' });
    }

    // Find the list by name
    const existingList = createdLists.find((list) => list.name === listName);

    if (!existingList) {
        return res.status(404).json({ error: 'List with the specified name does not exist.' });
    }

    // Return the list of superhero IDs for the specified list
    res.json({ listName: existingList.name, superheroIDs: existingList.superheroes });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});