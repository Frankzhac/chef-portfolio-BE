require("dotenv").config();
const axios = require('axios');

const { authenticate } = require('../auth/authenticate');
// const { restrictedMiddleware } = require('../auth/restrictedMiddleware');

const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig.js");
const jwt = require("jsonwebtoken");

const tokenService = require('../auth/token-service.js');
const Users = require('../users/users-model.js');


module.exports = server => {
    server.post('/api/register', register);
    server.post('/api/login', login);
    server.get('/api/recipes', authenticate, getRecipes);
};


function register(req, res) {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({
            message: "Please include a email and password."
        });
    }
    const newUser = req.body;
    const hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash;
    db("users")
        .insert(newUser)
        .then(response => {
            res.status(200).json({
                    message: "New account created successfully."
                });
        })
        .catch(error => {
            res.status(500).json({
                message: "There was an error creating the new account",
                error: error.message
            });
        });
}

function login(req, res) {
    // implement user login
    let { email, password } = req.body;

    Users.findBy({
            email
        })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = tokenService.generateToken(user);

                res.status(200).json({
                    message: `Welcome ${user.email}!, have a token...`,
                    token,
                });
            } else {
                res.status(401).json({
                    message: 'Invalid Credentials'
                });
            }
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
}

function getRecipes(req, res) {
    const requestOptions = {
        headers: {
            accept: 'application/json',
            // "X-RapidAPI-Host": 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            // "X-RapidAPI-Key": '1bf8a85985mshc932ac662acd79cp1a7abbjsn42e6fe031add',
            // "key": 'b28ebdabb9ff88cc5f8371b54e03c91e'
        },
    };

    axios
        .get('https://community-food2fork.p.rapidapi.com/get', requestOptions)
        .then(response => {
            res.status(200).json(response.data.results);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error Fetching recipes',
                error: err
            });
        });
}
