'use strict'

const { parseISO, startOfDay } = require('date-fns')

const Move = use('App/Models/Move')
const Store = use('App/Models/Store')

class MoveController {
  async index ({ request, response, params }) {
    const { storeId } = params
    let { date } = request.get()

    if (!date) {
      date = startOfDay(new Date())
    }

    const moves = await Move.query()
      .where('store_id', storeId)
      .where('date', date)
      .fetch()

    return moves
  }

  async store ({ request, response }) {
    const { entry, date, description, value, store_id, user_id } = request.all()

    const formattedDate = startOfDay(parseISO(date))

    const move = await Move.create({
      entry,
      date: formattedDate,
      description,
      value,
      store_id,
      user_id
    })
    const store = await Store.findOrFail(store_id)

    if (store.balance < value && !entry) {
      return response
        .status(401)
        .json({ error: 'Valor de caixa indisponivel para retirada' })
    }

    if (entry) {
      store.balance += value

      await store.save()
    } else {
      store.balance -= value

      await store.save()
    }

    return move
  }
}

module.exports = MoveController
