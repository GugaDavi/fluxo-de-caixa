'use strict'

const User = use('App/Models/User')
const Env = use('Env')

class UserController {
  async store ({ request }) {
    const { username, email, store_id, token, password } = request.all()

    let master = false

    if (token === Env.get('MASTER_KEY')) {
      master = true
    }

    const user = await User.create({
      username,
      master,
      email,
      store_id,
      password
    })

    return user
  }

  async update ({ request, auth }) {
    const data = request.all()

    const user = await User.findOrFail(auth.user.id)

    user.merge(data)

    await user.save()

    return user
  }
}

module.exports = UserController
