const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

const apiKey = '485a95406f93462b95a27a0c39d6ccbb'; // API Key hardcoded

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/recipes', async (req, res) => {
    const ingredients = req.query.ingredients;
    const diet = req.query.diet;

    if (!ingredients) {
        return res.status(400).send('Ingredients are required');
    }

    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
            params: {
                ingredients: ingredients,
                diet: diet,
                number: 5,
                apiKey: apiKey
            }
        });

        const recipes = response.data.map(recipe => ({
            title: recipe.title,
            ingredients: recipe.usedIngredients.map(ing => ing.name).join(', ')
        }));

        res.json({ results: recipes });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Failed to fetch recipes');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});