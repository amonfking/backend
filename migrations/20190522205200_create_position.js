exports.up = function(knex, Promise) {
  return knex.schema
        .createTable('questions', function(table) {
            table.increments('id');
            table.string('question', 255).notNullable();
            table.string('optiona', 255).notNullable();
            table.string('optionb', 255).notNullable();
            table.string('optionc', 255).notNullable();
            table.string('optiond', 255).notNullable();
            table.string('correctanswer',255).notNullable();
        })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('questions')
};
