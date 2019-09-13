'use strict'

const Goal = use('App/Models/Goal')

class GoalsController {
  async index ({ params, response }) {
    try {
      const goal = await Goal.findOrFail(params.storeId)

      return goal
    } catch (error) {
      console.log(error)
      return response
        .status(400)
        .json({ error: 'Check if you already registered a goal' })
    }
  }

  async store ({ request }) {
    const { store_id, store_goal, saller_goal } = request.all()

    const newGoal = await Goal.create({ store_id, store_goal, saller_goal })

    return newGoal
  }
}

module.exports = GoalsController
