
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', user => {
      user.increments();

      user
        .string('email', 100)
        .notNullable()
        .unique();

      user
        .string('name', 100)
        .notNullable()
        .unique();

       user
         .string('address', 100)
         .notNullable()
         .unique();

       user
         .string('city', 100)
         .notNullable()

       user
         .string('state', 100)
         .notNullable()
         .unique();

       user
         .string('zip code', 255)
         .notNullable()
         .unique();
         
       user
         .string('password', 255)
         .notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
