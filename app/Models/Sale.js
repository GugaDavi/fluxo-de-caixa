'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sale extends Model {
  client () {
    return this.belongsTo('App/Models/Client')
  }

  store () {
    return this.belongsTo('App/Models/Store')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Sale
