import jwt from 'jsonwebtoken';

import Users from '../models/Users';

import auth from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuario não encontrado' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha Invalida' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    });
  }
}

export default new SessionController();
