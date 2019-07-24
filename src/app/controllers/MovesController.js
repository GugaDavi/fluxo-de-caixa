import { startOfDay, parseISO } from 'date-fns';
import Moves from '../schemas/Moves';

class MovesController {
  async index(req, res) {
    const { day } = req.query;

    const startDay = startOfDay(parseISO(day));

    if (!day) {
      return res.status(401).json({ error: 'Refine sua busca' });
    }

    const allMoves = await Moves.find();

    const selectMoves = allMoves.filter(
      move => String(move.date) === String(startDay)
    );

    return res.json({ selectMoves });
  }
}

export default new MovesController();
