function getSuperheroInfo() {
    const superheroId = document.getElementById('superheroId').value;
    fetch(`/api/superhero/${superheroId}`)
        .then(response => response.json())
        .then(data => {
            const superheroInfo = document.getElementById('superheroInfo');
            superheroInfo.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error:', error);
            const superheroInfo = document.getElementById('superheroInfo');
            superheroInfo.innerHTML = 'Superhero not found.';
        });
}
