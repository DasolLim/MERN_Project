const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchType = document.getElementById('search-type');
const searchResults = document.getElementById('search-results');

// Assuming your JSON data is stored in a variable called 'superheroData'
// You can replace this with your actual data retrieval method

// Update your event listener for the search form
searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchTerm = searchInput.value;
    const searchCategory = searchType.value;

    // Implement asynchronous functionality to query the back-end and display search results
    const response = await fetch(`/api/search?field=${searchCategory}&pattern=${searchTerm}`);
    const data = await response.json();

    // Display search results based on the selected search category
    displaySearchResults(data, searchCategory, searchTerm);
});

// Helper function to display search results
function displaySearchResults(results, searchCategory, searchTerm) {
    searchResults.innerHTML = ''; // Clear previous results

    results.forEach((superhero) => {
        // Check if the search term matches the category or its corresponding attribute
        if (searchCategory === 'name' && superhero.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            // Create a container for each superhero's details
            const superheroContainer = createSuperheroContainer(superhero);
            searchResults.appendChild(superheroContainer);
        } else if (searchCategory === 'race' && superhero.Race.toLowerCase().includes(searchTerm.toLowerCase())) {
            const superheroContainer = createSuperheroContainer(superhero);
            searchResults.appendChild(superheroContainer);
        } else if (searchCategory === 'publisher' && superhero.Publisher.toLowerCase().includes(searchTerm.toLowerCase())) {
            const superheroContainer = createSuperheroContainer(superhero);
            searchResults.appendChild(superheroContainer);
        }
    });
}

// Helper function to create a container for superhero details
function createSuperheroContainer(superhero) {
    const superheroContainer = document.createElement('div');
    superheroContainer.className = 'superhero-container';

    // Create a div for each attribute and add it to the container
    for (const key in superhero) {
        const attributeElement = document.createElement('div');
        attributeElement.className = 'attribute';
        attributeElement.innerHTML = `<strong>${key}:</strong> ${superhero[key]}`;
        superheroContainer.appendChild(attributeElement);
    }

    return superheroContainer;
}

document.addEventListener('DOMContentLoaded', () => {
    const createListForm = document.getElementById('createListForm');
    const listNameInput = document.getElementById('listNameInput');
    const listsDropdownForSave = document.getElementById('listsDropdownForSave');
    const saveListForm = document.getElementById('saveListForm');
    const saveListInput = document.getElementById('superheroIDsInput');
    const saveListNameInput = document.getElementById('listNameInput'); // Add this line
    const saveListError = document.getElementById('saveListError');

    updateListsDropdownForSaveOptions();

    function displaySaveListError(errorMessage) {
        const saveListError = document.getElementById('saveListError');
        if (saveListError) {
            saveListError.textContent = errorMessage;
        } else {
            // Create and append the error element if it doesn't exist
            const errorElement = document.createElement('div');
            errorElement.id = 'saveListError';
            errorElement.className = 'error';
            errorElement.textContent = errorMessage;

            // Append the error element to a suitable parent element in your HTML structure
            const parentElement = document.querySelector('.container'); // Adjust this selector as needed
            if (parentElement) {
                parentElement.appendChild(errorElement);
            } else {
                console.error("Element with ID 'saveListError' not found, and a suitable parent element is missing.");
            }
        }
    }

    function displaySaveListError(errorMessage) {
        saveListError.textContent = errorMessage;
    }

    // Add this code to update the listsDropdownForSave when a new list is created
    function updateListsDropdownForSaveOptions() {
        const listsDropdownForSave = document.getElementById('listsDropdownForSave');
        fetch('/api/lists')
            .then((response) => response.json())
            .then((data) => {
                listsDropdownForSave.innerHTML = ''; // Clear existing options
                data.forEach((list) => {
                    const option = document.createElement('option');
                    option.value = list.name;
                    option.textContent = list.name;
                    listsDropdownForSave.appendChild(option);
                });
            })
            .catch((error) => {
                console.error('Error updating listsDropdownForSave:', error);
            });
    }

    // Event listener for creating a new list
    createListForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const listName = listNameInput.value;

        if (!listName) {
            alert('List name is required.');
            return;
        }

        // Send a request to create a new list
        fetch('/api/createList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: listName }),
        })
            .then((response) => {
                if (response.status === 400) {
                    return response.json();
                } else if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Unexpected response from the server');
                }
            })
            .then((data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                    alert('List created successfully');
                    listNameInput.value = ''; // Clear the input field
                    updateListsDropdownForSaveOptions(); // Update the dropdown
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });

    // Event listener for saving a list of superhero IDs
    saveListForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const listName = listsDropdownForSave.value;
        const superheroIDs = saveListInput.value;

        // Validate the input
        if (!listName || !superheroIDs) {
            displaySaveListError('Both list name and superhero IDs are required.');
            return;
        }

        // Send a request to save the list
        try {
            const response = await fetch('/api/saveList', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: listName, superheroIDs }),
            });

            if (response.ok) {
                // List saved successfully
                const data = await response.json();
                updateListsDropdownForSave(data.lists); // Update the lists dropdown for saving
                updateListsDropdownForGetSuperheroIDs(listName); // Update the lists dropdown for getting superhero IDs
                saveListNameInput.value = ''; // Clear the input field
                saveListInput.value = ''; // Clear the input field
            } else if (response.status === 400) {
                // Handle validation errors
                const errorData = await response.json();
                displaySaveListError(errorData.error);
            } else if (response.status === 404) {
                // List with the specified name does not exist
                const errorData = await response.json();
                displaySaveListError(errorData.error);
            } else {
                // Handle other errors
                displaySaveListError('Failed to save the list.');
            }
        } catch (error) {
            console.error('Error in saveList:', error);
            displaySaveListError('An error occurred.');
        }
    });

    // New code for managing favorite lists
    const listsDropdownForGetInfo = document.getElementById('listsDropdownForGetInfo');
    const displayListInfoButton = document.getElementById('displayListInfoButton');
    const listInfoContainer = document.getElementById('listInfoContainer');

    // Function to update the lists dropdown for saving
    const updateListsDropdownForSave = (lists) => {
        listsDropdownForSave.innerHTML = ''; // Clear the existing options

        // Create an option for each list and add it to the dropdown
        lists.forEach((list) => {
            const option = document.createElement('option');
            option.value = list.name;
            option.textContent = list.name;
            listsDropdownForSave.appendChild(option);
        });
    };

    // Fetch the lists from the server and populate the dropdown
    fetch('/api/lists')
        .then((response) => response.json())
        .then((data) => {
            updateListsDropdownForSave(data);
        })
        .catch((error) => {
            console.error('Error fetching lists:', error);
        });

    // Function to update the lists dropdown for getting superhero IDs
    const updateListsDropdownForGetSuperheroIDs = (listName) => {
        // Check if the listName already exists in the dropdown
        if (![...listsDropdownForGetSuperheroIDs.options].some((option) => option.value === listName)) {
            const option = document.createElement('option');
            option.value = listName;
            option.textContent = listName;
            listsDropdownForGetSuperheroIDs.appendChild(option);
        }
    };

    // Function to display information and powers of superheroes in a list
    const displayListInformation = (listName) => {
        fetch(`/api/getListInfo?name=${listName}`)
            .then((response) => response.json())
            .then((data) => {
                listInfoContainer.innerHTML = '';
                data.forEach((superhero) => {
                    const superheroContainer = createSuperheroContainer(superhero);
                    listInfoContainer.appendChild(superheroContainer);
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    // Event listener for Get Superhero IDs button
    document.getElementById('fetchSuperheroIDsButton').addEventListener('click', () => {
        const selectedList = document.getElementById('listsDropdownForGetSuperheroIDs').value;

        if (selectedList) {
            // Send a request to get the superhero IDs for the selected list
            fetch(`/api/getList?name=${selectedList}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Failed to get superhero IDs for the selected list.');
                    }
                })
                .then((data) => {
                    // Display the superhero IDs on the webpage
                    const superheroIDsContainer = document.getElementById('superheroIDsContainer');
                    superheroIDsContainer.innerHTML = JSON.stringify(data.superheroIDs);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    // Handle errors, e.g., display an error message
                });
        }
    });

    // Add an event listener for the "Get Superhero IDs" button
    const fetchSuperheroIDsButton = document.getElementById('fetchSuperheroIDsButton');
    fetchSuperheroIDsButton.addEventListener('click', async () => {
        const selectedListName = document.getElementById('listsDropdownForGetSuperheroIDs').value;
        if (!selectedListName) {
            alert('Please select a list first.');
            return;
        }

        // Fetch the superhero IDs from the selected list
        try {
            const response = await fetch(`/api/getList?name=${selectedListName}`);
            if (response.ok) {
                const data = await response.json();
                const superheroIDs = data.superheroIDs;

                // Fetch superhero information one by one for the retrieved IDs
                fetchSuperheroInformationSequentially(superheroIDs);
            } else {
                console.error('Error fetching list:', response.statusText);
            }
        } catch (error) {
            console.error('Error in fetchSuperheroIDsButton:', error);
        }
    });

    // Function to fetch superhero information one by one
    async function fetchSuperheroInformationSequentially(superheroIDs) {
        const superheroInfo = [];

        for (const superheroID of superheroIDs) {
            try {
                const response = await fetch(`/api/superhero/${superheroID}`);
                if (response.ok) {
                    const data = await response.json();
                    superheroInfo.push(data);
                } else {
                    console.error(`Error fetching superhero information for ID ${superheroID}:`, response.statusText);
                }
            } catch (error) {
                console.error(`Error in fetchSuperheroInformationSequentially for ID ${superheroID}:`, error);
            }
        }

        // Display the superhero information
        displaySuperheroInformation(superheroInfo);
    }

    // Function to display superhero information
    function displaySuperheroInformation(superheroInfo) {
        const superheroIDsContainer = document.getElementById('superheroIDsContainer');
        superheroIDsContainer.innerHTML = '';

        superheroInfo.forEach((superhero) => {
            const superheroContainer = createSuperheroContainer(superhero);
            superheroIDsContainer.appendChild(superheroContainer);
        });
    }

    // Function to create a container for superhero details
    function createSuperheroContainer(superhero) {
        const superheroContainer = document.createElement('div');
        superheroContainer.className = 'superhero-container';

        // Create a div for each attribute and add it to the container
        for (const key in superhero) {
            const attributeElement = document.createElement('div');
            attributeElement.className = 'attribute';
            attributeElement.innerHTML = `<strong>${key}:</strong> ${superhero[key]}`;
            superheroContainer.appendChild(attributeElement);
        }

        return superheroContainer;
    };

    // Function to display save list error
    function displaySaveListError(errorMessage) {
        saveListError.textContent = errorMessage;
    }

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