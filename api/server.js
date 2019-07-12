const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const configureRoutes = require('../config/routes.js');

const server = express();


server.use(helmet());
server.use(cors());
server.use(express.json());

configureRoutes(server);

// server check
server.get('/', (req, res) => {
    res.send('Hello World'); 
});


// Get recipes

server.get('/api/recipes', async (req, res) => {
    try {
        const recipe = await db('recipes')
            .where({ id: req.params.id })
            .first();
        res.status(200).json(recipe);
    } catch (err) {
        res.status(500).json(err);
    }
});


// list a recipe by id

server.get('/recipes/:id', async (req, res) => {
    // get the recipes from the database
    try {
        const recipe = await db('recipes')
            .where({
                id: req.params.id
            })
            .first();
        res.status(200).json(recipe);
    } catch (err) {
        res.status(500).json(err);
    }
});


// create recipes

server.post('/recipes', (req, res) => {
    const newRecipe = req.body;

    db('recipes')
        .insert(newRecipe)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => {
            // console.log(err);
            res.status(500).json({
                success: false,
                error: "There was an error while saving the recipe to the database",
            });
        });
});


// PUT- update recipes

server.put('/recipes/:id', (req, res) => {
    const id = req.params.id;
    const update = req.body;

    db('recipes')
        .where({
            id
        })
        .update(update)
        .then(count => {
            res.status(200).json({
                count
            });
        })
        .catch(err => {
            res.status(200).json({
                errorMessage: "Can't find recipes by id."
            });
        });
});


// remove recipes

server.delete('/recipes/:id', async (req, res) => {
    try {
        const count = await db('recipes')
            .where({
                id: req.params.id
            })
            .del();

        if (count > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({
                message: 'Records not found'
            });
        }
    } catch (err) {}
});



module.exports = server;