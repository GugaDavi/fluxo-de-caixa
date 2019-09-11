'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Move extends Model {
  store () {
    return this.belongsTo('App/Models/Store')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Move
