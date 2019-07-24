import Sequelize, { Model } from 'sequelize';

class Saldo extends Model {
  static init(sequelize) {
    super.init(
      {
        saldo: Sequelize.NUMBER,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Saldo;
