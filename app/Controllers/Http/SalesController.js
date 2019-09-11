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
      .whereIn('date', [startMonth, endMonth])
      .fetch()

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
   * Display a single sale.
   * GET sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {}

  /**
   * Render a form to update an existing sale.
   * GET sales/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {}

  /**
   * Update sale details.
   * PUT or PATCH sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {}

  /**
   * Delete a sale with id.
   * DELETE sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {}
}

module.exports = SaleController
