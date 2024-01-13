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

const Goal = require('./models/goalModel');

// Connecting to MongoDB database
connectDB();

// Express is a web application framework for Node.js
// Creating new application with defined routes to handle HTTP request and response
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Route to get public goals
app.get('/api/goals/public', async (req, res) => {
    try {
        const goals = await Goal.find({ isPrivate: false }).sort({ lastModified: -1 }).limit(10);
        res.json(goals);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

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

// Item 5: Create a new list to save a list of superheroes with a given list name. Return an error if the name exists.
// Create a new list with a given name
app.post('/api/createList', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required for creating a list.' });
    }

    if (createdLists.some((list) => list.name === name)) {
        return res.status(400).json({ error: 'List with the same name already exists.' });
    }

    const newList = {
        name,
        superheroes: [],
    };

    createdLists.push(newList);

    // Save the updated lists to lists.json
    fs.writeFile('lists.json', JSON.stringify(createdLists), 'utf-8', (err) => {
        if (err) {
            console.error('Error saving lists:', err);
            return res.status(500).json({ error: 'Failed to save the list.' });
        }
        res.status(200).json({ message: 'List created successfully.', lists: createdLists });
    });

    // Save the updated lists to lists.json
    saveListsToFile();
});

// New route to get the lists
app.get('/api/lists', (req, res) => {
    res.json(createdLists);
});

// Item 6: Save a list of superhero IDs to a given list name.
app.put('/api/saveList', express.json(), (req, res) => {
    const { name, superheroIDs } = req.body;

    if (!name || !superheroIDs) {
        return res.status(400).json({ error: 'Both list name and superhero IDs are required for saving a list.' });
    }

    // Check if the list name exists in the 'lists.json' file
    const existingList = createdLists.find((list) => list.name === name);

    if (!existingList) {
        return res.status(404).json({ error: 'List with the specified name does not exist.' });
    }

    // Parse the superhero IDs input as a comma-separated string and split into an array
    const superheroIDsArray = superheroIDs.split(',').map((id) => parseInt(id.trim(), 10));

    // Update the superhero IDs in the existing list
    existingList.superheroes = superheroIDsArray;

    // Save the updated lists to 'lists.json'
    saveListsToFile();

    // Notify the client that the list was successfully updated
    res.json({ message: 'List updated successfully.', lists: createdLists });

    // Check if the list name exists and show an alert if it does
    if (existingList) {
        alert(`The list name "${name}" exists.`);
    }
});

// Save the updated lists to lists.json
function saveListsToFile() {
    fs.writeFile(listsFilePath, JSON.stringify(createdLists, null, 4), 'utf-8', (err) => {
        if (err) {
            console.error('Error saving lists:', err);
        }
    });
}

// Item 7: Get the list of superhero IDs for a given list
// Get the list of superhero IDs for a given list
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

// Item 8: Delete a list of superheroes with a given name. Return an error if the given list doesn’t exist
// Delete a list of superheroes with a given name
app.delete('/api/deleteList', express.json(), (req, res) => {
    const { name } = req.body; // Get the list name from the request body

    if (!name) {
        return res.status(400).json({ error: 'List name is required.' });
    }

    // Find the index of the list by name
    const listIndex = createdLists.findIndex((list) => list.name === name);

    if (listIndex === -1) {
        return res.status(404).json({ error: 'List with the specified name does not exist.' });
    }

    // Delete the list from the createdLists array
    createdLists.splice(listIndex, 1);

    res.json({ message: 'List deleted successfully.' });

    // Save the updated lists to lists.json
    saveListsToFile();
});

// Item 9: Get a list of names, information and powers of all superheroes saved in a given list
// Get information and powers of all superheroes saved in a given list
app.get('/api/getListInfo', (req, res) => {
    const listName = req.query.name; // Get the list name from the query parameters

    if (!listName) {
        return res.status(400).json({ error: 'List name is required.' });
    }

    // Find the list by name
    const existingList = createdLists.find((list) => list.name === listName);

    if (!existingList) {
        return res.status(404).json({ error: 'List with the specified name does not exist.' });
    }

    const superheroInfo = existingList.superheroes.map((superheroID) => {
        const superhero = info.find((hero) => hero.id === superheroID);
        if (superhero) {
            const powersData = powers[superheroID - 1]; // Adjust for 0-based index
            if (!powersData) {
                return {
                    ...superhero,
                    powers: [],
                };
            }
            // Remove the 'hero_names' property from the powers object
            delete powersData.hero_names;
            return {
                ...superhero,
                powers: powersData,
            };
        }
    });

    res.json(superheroInfo);
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

