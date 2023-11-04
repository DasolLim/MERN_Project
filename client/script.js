document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    const createListForm = document.getElementById('createListForm');
    const listNameInput = document.getElementById('listNameInput');
    const createListButton = document.getElementById('createListButton');

    const listsDropdown = document.getElementById('listsDropdown');
    const displayListButton = document.getElementById('displayListButton');

    const sortDropdown = document.getElementById('sortDropdown');

    const superheroInfoForm = document.getElementById('superheroInfoForm');
    const superheroIDInput = document.getElementById('superheroIDInput'); // Move this line up
    const superheroInfo = document.getElementById('superheroInfo');

    const fetchPowersForm = document.getElementById('fetchPowersForm');
    const superheroIDForPowers = document.getElementById('superheroIDForPowers');

    // Add an event listener for fetching powers
    fetchPowersForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const superheroID = superheroIDForPowers.value;
        if (superheroID) {
            fetch(`/api/superhero/powers/${superheroID}`)
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else if (response.status === 404) {
                        powersContainer.textContent = 'Powers not found for the superhero.';
                    } else {
                        throw new Error('Failed to fetch powers.');
                    }
                })
                .then((data) => {
                    // Display the powers
                    const powersList = Object.entries(data).filter(([key, value]) => value === "True").map(([key, value]) => key);
                    if (powersList.length > 0) {
                        powersContainer.textContent = `Powers: ${powersList.join(', ')}`;
                    } else {
                        powersContainer.textContent = 'No superpowers for this superhero.';
                    }
                })
                .catch((error) => {
                    console.error(error);
                    powersContainer.textContent = 'Error fetching powers.';
                });
        }
    });

    // Event listener for fetching superhero information
    superheroInfoForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = superheroIDInput.value;
        if (!id) {
            superheroInfo.textContent = 'Please enter a superhero ID.';
        } else {
            try {
                const response = await fetch(`/api/superhero/${id}`);
                if (response.ok) {
                    const superhero = await response.json();
                    displaySuperheroInfo(superhero);
                } else if (response.status === 404) {
                    superheroInfo.textContent = 'Superhero not found.';
                } else {
                    superheroInfo.textContent = 'Error fetching superhero information.';
                }
            } catch (error) {
                console.error('Error in fetching superhero information:', error);
                superheroInfo.textContent = 'An error occurred.';
            }
        }
    });

    // Function to display superhero information
    const displaySuperheroInfo = (superhero) => {
        superheroInfo.textContent = `Name: ${superhero.name}, Race: ${superhero.race}, Publisher: ${superhero.publisher}, Power: ${superhero.power}`;
    };

    // Function to send a request to the back-end to search for superheroes
    const searchSuperheroes = async (searchField, searchTerm) => {
        try {
            const response = await fetch(`/api/search?field=${searchField}&term=${searchTerm}`);
            if (response.ok) {
                const data = await response.json();
                displaySearchResults(data);
            } else {
                console.error('Search request failed.');
            }
        } catch (error) {
            console.error('Error in searchSuperheroes:', error);
        }
    };

    // Function to display search results
    const displaySearchResults = (data) => {
        searchResults.innerHTML = '';
        data.forEach((superhero) => {
            const heroElement = document.createElement('div');
            heroElement.className = 'superhero';
            heroElement.innerHTML = `<h3>${superhero.name}</h3><p>Race: ${superhero.race}, Publisher: ${superhero.publisher}, Power: ${superhero.power}</p>`;
            searchResults.appendChild(heroElement);
        });
    };

    // Function to send a request to create a new favorite list
    const createFavoriteList = async (listName) => {
        try {
            const response = await fetch(`/api/createList?name=${listName}`);
            if (response.ok) {
                const data = await response.json();
                updateListsDropdown(data.lists);
            } else {
                console.error('Create list request failed.');
            }
        } catch (error) {
            console.error('Error in createFavoriteList:', error);
        }
    };

    // Function to update the lists dropdown
    const updateListsDropdown = (lists) => {
        listsDropdown.innerHTML = '';
        lists.forEach((list) => {
            const option = document.createElement('option');
            option.value = list.name;
            option.textContent = list.name;
            listsDropdown.appendChild(option);
        });
    };

    // Function to send a request to retrieve and display a favorite list
    const displayFavoriteList = async (listName) => {
        try {
            const response = await fetch(`/api/displayList?name=${listName}`);
            if (response.ok) {
                const data = await response.json();
                displayListResults(data.list);
            } else {
                console.error('Display list request failed.');
            }
        } catch (error) {
            console.error('Error in displayFavoriteList:', error);
        }
    };

    // Function to display the favorite list results
    const displayListResults = (list) => {
        searchResults.innerHTML = '';
        list.superheroes.forEach((superhero) => {
            const heroElement = document.createElement('div');
            heroElement.className = 'superhero';
            heroElement.innerHTML = `<h3>${superhero.name}</h3><p>Race: ${superhero.race}, Publisher: ${superhero.publisher}, Power: ${superhero.power}</p>`;
            searchResults.appendChild(heroElement);
        });
    };

    // Event listener for searching superheroes
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchField = searchInput.value;
        searchSuperheroes(searchField, searchInput.value);
    });

    // Event listener for creating a favorite list
    createListForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const listName = listNameInput.value;
        createFavoriteList(listName);
    });

    // Event listener for displaying a favorite list
    displayListButton.addEventListener('click', () => {
        const listName = listsDropdown.value;
        displayFavoriteList(listName);
    });

    // Event listener for sorting
    sortDropdown.addEventListener('change', () => {
        const field = sortDropdown.value;
        // Call a sorting function here using field (name, race, publisher, power)
    });
});
