'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SalesSchema extends Schema {
  up () {
    this.create('sales', (table) => {
      table.increments()
      table.string('product').notNullable()
      table
        .integer('client_id')
        .unsigned()
        .references('id')
        .inTable('clients')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .defaultTo(null)
      table.timestamp('date').notNullable()
      table.string('reserve_code')
      table.string('provider')
      table.float('total', 2).notNullable()
      table.float('commission', 2)
      table.timestamps()
    })
  }

  down () {
    this.drop('sales')
  }
}

module.exports = SalesSchema
