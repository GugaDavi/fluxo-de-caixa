'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Goal extends Model {
  store () {
    return this.belongsTo('App/Models/Store')
  }
}

module.exports = Goal
