'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MovesSchema extends Schema {
  up () {
    this.create('moves', (table) => {
      table.increments()
      table
        .integer('store_id')
        .unsigned()
        .references('id')
        .inTable('stores')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.boolean('entry').notNullable()
      table.date('date').notNullable()
      table.string('description').notNullable()
      table.float('value', 2).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('moves')
  }
}

module.exports = MovesSchema
