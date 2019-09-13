'use strict'

const { parseISO, startOfDay, startOfMonth, endOfMonth } = require('date-fns')

const Sale = use('App/Models/Sale')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
class SaleController {
  async index ({ request, params }) {
    const { date } = request.get()
    let formattedDate

    if (date) {
      formattedDate = startOfDay(parseISO(date))
    } else {
      formattedDate = startOfDay(new Date())
    }

    const startMonth = startOfMonth(formattedDate)
    const endMonth = endOfMonth(formattedDate)

    const sales = await Sale.query()
      .where('store_id', params.storeId)
      .whereBetween('date', [startMonth, endMonth])
      .fetch()

    console.log(startMonth, endMonth)

    return sales
  }

  /**
   * Create/save a new sale.
   * POST sales
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const {
      product,
      user_id,
      store_id,
      client_id,
      date,
      reserve_code,
      provider,
      total,
      commission
    } = request.all()

    const formattedDate = startOfDay(parseISO(date))

    const sale = await Sale.create({
      product,
      user_id,
      store_id,
      client_id,
      date: formattedDate,
      reserve_code,
      provider,
      total,
      commission
    })

    return sale
  }

  /**
   * Update sale details.
   * PUT or PATCH sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const sale = await Sale.findOrFail(params.saleId)

    const data = request.all()

    sale.merge(data)

    sale.save()

    return sale
  }

  /**
   * Delete a sale with id.
   * DELETE sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const sale = await Sale.findOrFail(params.saleId)

    sale.delete()

    return response.send()
  }
}

module.exports = SaleController
