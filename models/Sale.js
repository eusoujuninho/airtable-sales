const AirtableModel = require('./AirtableModel');

class Sale extends AirtableModel {
  constructor() {
    super('Vendas');
  }
}

module.exports = Sale;
