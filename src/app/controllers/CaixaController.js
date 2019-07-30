import { startOfDay, parseISO } from 'date-fns';
import Saldo from '../models/Saldo';
import Moves from '../schemas/Moves';

import { formatPrice } from '../../util/format';

class CaixaController {
  async index(req, res) {
    const saldoCaixa = await Saldo.findByPk('01');

    res.json({ saldo: saldoCaixa.saldo });
  }

  async update(req, res) {
    const { description, date, entered, value, name } = req.body;
    const saldoCaixa = await Saldo.findByPk('01');

    let { saldo } = saldoCaixa;

    if (entered) {
      saldo += value;
    } else {
      saldo -= value;
    }

    if (saldo < 0) {
      return res
        .status(404)
        .json({ error: 'Saldo indisponivel para a operação' });
    }

    const correctDate = startOfDay(parseISO(date));

    await Moves.create({
      user_name: name,
      description,
      date: correctDate,
      entered,
      value,
    });

    await saldoCaixa.update({ saldo });

    return res.json({ name, description, date, entered, value });
  }
}

export default new CaixaController();
