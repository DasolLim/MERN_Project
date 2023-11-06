// Function to match superheroes based on search criteria
function match(field, pattern) {
    let url = `/api/search?field=${encodeURIComponent(field)}&pattern=${encodeURIComponent(pattern)}`;

    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Search failed.');
            }
        })
        .then((data) => {
            // Display the search results
            displaySearchResults(data);
        })
        .catch((error) => {
            console.error(error);
            searchResults.textContent = 'Error: ' + error.message;
        });
}

// Function to display search results
function displaySearchResults(results) {
    searchResults.innerHTML = '';

    if (results.length > 0) {
        searchResults.innerHTML = '<h3>Search Results:</h3>';
        results.forEach((result) => {
            const resultElement = document.createElement('p');
            resultElement.textContent = `ID: ${result.id}, Name: ${result.name}`;
            searchResults.appendChild(resultElement);
        });
    } else {
        searchResults.innerHTML = 'No matches found.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const createListForm = document.getElementById('createListForm');
    const listNameInput = document.getElementById('listNameInput');
    const listError = document.getElementById('listError');
    const listsDropdownForSave = document.getElementById('listsDropdownForSave');
    const saveListForm = document.getElementById('saveListForm');
    const saveListInput = document.getElementById('superheroIDsInput');
    const saveListNameInput = document.getElementById('listNameInput'); // Add this line
    const saveListError = document.getElementById('saveListError');
    const superheroInfoForm = document.getElementById('superheroInfoForm'); // Changed variable name

    // Event listener for searching superheroes
    superheroInfoForm.addEventListener('submit', (event) => { // Changed event listener target
        event.preventDefault();
        const searchField = document.getElementById('searchField').value;
        const searchPattern = document.getElementById('searchPattern').value;
        const searchNumber = document.getElementById('searchNumber').value;

        match(searchField, searchPattern, searchNumber);
    });

    // // Function to match superheroes based on search criteria
    // function match(field, pattern, number) {
    //     let url = `/api/search?field=${field}&pattern=${pattern}`;
    //     if (number) {
    //         url += `&n=${number}`;
    //     } else {
    //         url += `&n=all`;
    //     }

    //     fetch(url)
    //         .then((response) => {
    //             if (response.ok) {
    //                 return response.json();
    //             } else {
    //                 throw new Error('Search failed.');
    //             }
    //         })
    //         .then((data) => {
    //             // Display the search results
    //             displaySearchResults(data);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             searchResults.textContent = 'Error: ' + error.message;
    //         });
    // }

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

    // Add an event listener for fetching superhero IDs for the selected list
    const fetchSuperheroIDsButton = document.getElementById('fetchSuperheroIDsButton');
    fetchSuperheroIDsButton.addEventListener('click', async () => {
        const selectedList = listsDropdownForGetSuperheroIDs.value;

        if (!selectedList) {
            // Handle case when no list is selected
            console.log('Please select a list.');
            return;
        }

        // Make an API request to get superhero IDs for the selected list
        try {
            const response = await fetch(`/api/getList?name=${selectedList}`);

            if (response.ok) {
                const data = await response.json();
                displaySuperheroIDs(data.superheroIDs);
            } else if (response.status === 400) {
                // Handle validation errors
                const errorData = await response.json();
                displaySuperheroIDsError(errorData.error);
            } else if (response.status === 404) {
                // List with the specified name does not exist
                const errorData = await response.json();
                displaySuperheroIDsError(errorData.error);
            } else {
                // Handle other errors
                displaySuperheroIDsError('Failed to get the superhero IDs for the list.');
            }
        } catch (error) {
            console.error('Error in fetchSuperheroIDsButton:', error);
            displaySuperheroIDsError('An error occurred.');
        }
    });

    // Function to display superhero IDs
    const displaySuperheroIDs = (superheroIDs) => {
        const superheroIDsContainer = document.getElementById('superheroIDsContainer');

        if (superheroIDs.length > 0) {
            superheroIDsContainer.innerHTML = `<h3>Superhero IDs for the Selected List:</h3><ul>${superheroIDs.map(id => `<li>${id}</li>`).join('')}</ul>`;
        } else {
            superheroIDsContainer.innerHTML = 'No superhero IDs found for the selected list.';
        }
    };

    // Function to display superhero IDs error
    const displaySuperheroIDsError = (errorMessage) => {
        const superheroIDsContainer = document.getElementById('superheroIDsContainer');
        superheroIDsContainer.textContent = 'Error: ' + errorMessage;
    };


    // Function to get and display all available publisher names
    const getAllPublishers = () => {
        fetch('/api/publishers')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch publishers.');
                }
            })
            .then((data) => {
                displayPublishers(data);
            })
            .catch((error) => {
                console.error(error); // Check for any error messages in the console
                // Handle the error, e.g., display an error message on the page
            });
    };

    // Function to display publisher names on the page
    const displayPublishers = (publishers) => {
        const publishersContainer = document.getElementById('publishersContainer');

        if (publishers.length > 0) {
            publishersContainer.innerHTML = `<h3>Publisher Names:</h3><ul>${publishers.map(publisher => `<li>${publisher}</li>`).join('')}</ul>`;
        } else {
            publishersContainer.innerHTML = 'No publishers found.';
        }
    };

    createListForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const listName = listNameInput.value;

        if (!listName) {
            alert('List name is required.');
            return;
        }

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
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });

    // Function to display list creation error
    function displayListError(errorMessage) {
        listError.textContent = errorMessage;
    }

    // Function to clear list creation error
    function clearListError() {
        listError.textContent = '';
    }

    // Function to update the lists dropdown
    const updateListsDropdown = (lists) => {
        listsDropdownForSave.innerHTML = ''; // Use listsDropdownForSave
        lists.forEach((list) => {
            const option = document.createElement('option');
            option.value = list.name;
            option.textContent = list.name;
            listsDropdownForSave.appendChild(option); // Use listsDropdownForSave
        });
    }

    // Event listener for saving a list of superhero IDs
    saveListForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const listName = saveListNameInput.value;
        const superheroIDs = saveListInput.value;

        // Validate the input
        if (!listName || !superheroIDs) {
            displaySaveListError("Both list name and superhero IDs are required.");
            return;
        }

        // Send a request to save the list
        try {
            const response = await fetch(`/api/saveList`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: listName, superheroIDs: superheroIDs }),
            });

            if (response.ok) {
                // List saved successfully
                const data = await response.json();
                updateListsDropdown(data.lists);
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

    // Function to display save list error
    function displaySaveListError(errorMessage) {
        saveListError.textContent = errorMessage;
    }

    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');

    // Event listener for searching superheroes
    searchButton.addEventListener('click', () => {
        const searchField = document.getElementById('searchField').value;
        const searchPattern = document.getElementById('searchPattern').value;
        const searchNumber = document.getElementById('searchNumber').value;

        match(searchField, searchPattern, searchNumber);
    });

    // Function to match superheroes based on search criteria
    function match(field, pattern, number) {
        let url = `/api/search?field=${field}&pattern=${pattern}`;

        if (number) {
            url += `&n=${number}`;
        } else {
            url += `&n=all`;
        }

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Search failed.');
                }
            })
            .then((data) => {
                // Display the search results
                displaySearchResults(data);
            })
            .catch((error) => {
                console.error(error);
                searchResults.textContent = 'Error: ' + error.message;
            });
    }

    function displaySearchResults(results) {
        searchResults.innerHTML = '';

        if (results.length > 0) {
            searchResults.innerHTML = '<h3>Search Results:</h3>';

            // Check if there's a limit on the number of results to display
            const limit = parseInt(document.getElementById('searchNumber').value);

            results.slice(0, limit).forEach((result) => {
                const resultElement = document.createElement('p');
                resultElement.textContent = `ID: ${result}`;
                searchResults.appendChild(resultElement);
            });
        } else {
            searchResults.innerHTML = 'No matches found.';
        }
    }

    const searchSuperheroes = async (searchField, pattern, n) => {
        try {
            // Construct the URL with query parameters
            const url = `/api/search?field=${searchField}&pattern=${pattern}&n=${n}`;
            const response = await fetch(url);

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

    // Event listener for a button click to fetch and display publisher names
    const fetchPublishersButton = document.getElementById('fetchPublishersButton');
    fetchPublishersButton.addEventListener('click', () => {
        getAllPublishers();
    });

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
                    console.error('Error in fetchPowersForm:', error);
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

    // Function to send a request to create a new favorite list
    const createFavoriteList = async (listName) => {
        try {
            const response = await fetch(`/api/createList?name=${listName}`);
            if (response.ok) {
                const data = await response.json();
                updateListsDropdown(data.lists); // Pass the lists to the function
            } else {
                console.error('Create list request failed.');
            }
        } catch (error) {
            console.error('Error in createFavoriteList:', error);
        }
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