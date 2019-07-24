import User from '../models/Users';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'Usuario já existe' });
    }
    const user = await User.create(req.body);

    return res.json({ user });
  }

  async update(req, res) {
    res.json(req.userId);
  }
}

export default new UserController();
