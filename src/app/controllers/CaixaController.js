import Saldo from '../models/Saldo';
import Movimentacoes from '../schemas/Movimentacoes';

class CaixaController {
  async store(req, res) {
    const { description, date, entered, value } = req.body;
    const saldoCaixa = await Saldo.findByPk('01');
    const user_id = req.userId;

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

    await Movimentacoes.create({
      user_id,
      description,
      date,
      entered,
      value,
    });

    await saldoCaixa.update({ saldo });

    return res.json({ user_id, description, date, entered, value });
  }
}

export default new CaixaController();
