exports.up = function(knex, Promise) {
  return knex.schema
        .createTable('users', function(table) {
            table.increments('id');
            table.string('name', 255).notNullable();
            table.string('address', 255).nullable();
            table.string('contact', 255).nullable();
            table.string('email', 255).notNullable();
            table.string('path', 255).nullable();
            table.string('username').notNullable();
            table.string('password').notNullable();
            table.string('usertype').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').nullable();
            table.timestamp('deleted_at').nullable();
        })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
