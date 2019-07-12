const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
    find,
    findById,
    insert,
    update,
    remove,
};

function find() {
    return db('recipes');
}

function findById(id) {
    return db('recipes').where({
        id: Number(id)
    });
}

function insert(recipe) {
    return db('recipes')
        .insert(recipe)
        .then(ids => ({
            id: ids[0]
        }));
}

function update(id, recipe) {
    return db('recipes')
        .where('id', Number(id))
        .update(recipe);
}

function remove(id) {
    return db('recipes')
        .where('id', Number(id))
        .del();
}