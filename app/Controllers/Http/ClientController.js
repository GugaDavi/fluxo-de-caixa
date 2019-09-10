'use strict'

const { parseISO } = require('date-fns')

const Client = use('App/Models/Client')

class ClientController {
  async index ({ request, params }) {
    const { page } = request.get()

    const clients = await Client.query().where('store_id', params.storeId).paginate(page)

    return clients
  }

  async store ({ request, response }) {
    const { name, email, date, fone, address, store_id } = request.all()

    const born = parseISO(date)

    const client = await Client.create({ name, email, fone, born, address, store_id })

    return client
  }

  async update ({ params, request }) {
    const client = await Client.findOrFail(params.id)

    const { name, email, date, fone, address, store_id } = request.all()

    const born = parseISO(date)

    client.merge({ name, email, fone, born, address, store_id })

    await client.save()

    return client
  }
}

module.exports = ClientController
