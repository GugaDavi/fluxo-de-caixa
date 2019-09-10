'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', table => {
      table.increments()
      table
        .string('username', 80)
        .notNullable()
      table
        .string('email', 254)
        .notNullable()
        .unique()
      table
        .integer('store_id')
        .unsigned()
        .references('id')
        .inTable('stores')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .boolean('master')
        .notNullable()
        .defaultTo(false)
      table.string('password', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
