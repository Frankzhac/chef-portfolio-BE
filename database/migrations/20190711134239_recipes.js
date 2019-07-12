
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipes', recipe => {
      recipe.increments();

      recipe.string('name', 255).notNullable();

      recipe.string('description', 2500).notNullable();

      recipe.integer('time').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('recipes');
};
