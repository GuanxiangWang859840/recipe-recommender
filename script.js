function getRecipes() {
    const ingredients = document.getElementById('ingredients').value;
    const diet = document.getElementById('diet').value;
    const recipesDiv = document.getElementById('recipes');

    if (!ingredients) {
        alert('Please enter some ingredients.');
        return;
    }

    fetch(`/recipes?ingredients=${encodeURIComponent(ingredients)}&diet=${encodeURIComponent(diet)}`)
        .then(response => response.json())
        .then(data => {
            recipesDiv.innerHTML = '';
            data.results.forEach(recipe => {
                const div = document.createElement('div');
                div.className = 'recipe';
                div.innerHTML = `<strong>${recipe.title}</strong><br>${recipe.ingredients}`;
                recipesDiv.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch recipes.');
        });
}