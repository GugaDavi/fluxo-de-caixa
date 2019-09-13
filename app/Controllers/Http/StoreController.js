'use strict'

const Store = use('App/Models/Store')

class StoreController {
  async index ({ request, response, view }) {
    const stores = await Store.query().fetch()

    return stores
  }

  async store ({ request }) {
    const { storeName, local, balance } = request.all()

    const store = await Store.create({ storeName, local, balance })

    return store
  }

  async show ({ params, request, response, view }) {}

  async edit ({ params, request, response, view }) {}

  async update ({ params, request, response }) {}

  async destroy ({ params, request, response }) {}
}

module.exports = StoreController
