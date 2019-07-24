import { startOfDay, parseISO } from 'date-fns';
import Saldo from '../models/Saldo';
import Moves from '../schemas/Moves';

class CaixaController {
  async index(req, res) {
    const saldoCaixa = await Saldo.findByPk(req.caixaId);

    res.json({ saldo: `R$ ${saldoCaixa.saldo}` });
  }

  async update(req, res) {
    const { description, date, entered, value } = req.body;
    const user_id = req.userId;
    const saldoCaixa = await Saldo.findByPk(req.caixaId);

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
      user_id,
      description,
      date: correctDate,
      entered,
      value,
    });

    await saldoCaixa.update({ saldo });

    return res.json({ user_id, description, date, entered, saldo });
  }
}

export default new CaixaController();
