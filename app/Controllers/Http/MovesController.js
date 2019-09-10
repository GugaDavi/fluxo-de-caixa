'use strict'

const { parseISO } = require('date-fns')

const Move = use('App/Models/Move')
const Store = use('App/Models/Store')

class MoveController {
  async index ({ request, response, view }) {
  }

  async store ({ request }) {
    const { entry, date, description, value, store_id } = request.all()

    const formattedDate = parseISO(date)

    const move = await Move.create({
      entry,
      date: formattedDate,
      description,
      value,
      store_id
    })
    const store = await Store.findOrFail(store_id)

    if (entry) {
      store.balance += value

      await store.save()
    } else {
      store.balance -= value

      await store.save()
    }

    return move
  }

  async update ({ params, request }) {
    const { entry, date, description, value, store_id } = request.all()

    const formattedDate = parseISO(date)

    const move = await Move.findOrFail(params.id)
    const store = await Store.findOrFail(store_id)

    let difference = move.value > value ? move.value - value : value - move.value

    if (entry) {
      store.balance += difference
    } else {
      difference -= difference
    }

    await store.save()
    await move.merge({ entry, date: formattedDate, description, value, store_id })
    await move.save()

    return move
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = MoveController
