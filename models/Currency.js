const AirtableModel = require('./AirtableModel');
const ExchangeRate = require('./ExchangeRate');

class Currency extends AirtableModel {
  constructor() {
    super('Moedas');
    this.attributes = {}; // Garantindo a inicialização do objeto de atributos
  }

  // Define métodos para manipulação de atributos específicos
  setCode(value) { this.setAttribute('code', value); }
  setNumber(value) { this.setAttribute('number', value); }
  setDecimals(value) { this.setAttribute('decimals', value); }
  setName(value) { this.setAttribute('name', value); }

  // Obtém os atributos
  getCode() { return this.getAttribute('code'); }
  getNumber() { return this.getAttribute('number'); }
  getDecimals() { return this.getAttribute('decimals'); }
  getName() { return this.getAttribute('name'); }

  async findByCode(code) {
    const currencyRecord = await this.findBy('code', code);
    if (currencyRecord) {
      // Atualiza os atributos locais com os dados encontrados
      this.setCode(currencyRecord.code);
      this.setNumber(currencyRecord.number);
      this.setDecimals(currencyRecord.decimals);
      this.setName(currencyRecord.name);
    }
    return currencyRecord;
  }

  async findExchangeRateByCode(code) {
    const currencyRecord = await this.findByCode(code);
    if (!currencyRecord) {
      console.error(`Moeda com o código ${code} não encontrada.`);
      return null;
    }

    const exchangeRateModel = new ExchangeRate();
    const exchangeRate = await exchangeRateModel.findByCurrencyId(currencyRecord.id);
    return exchangeRate;
  }

  // Garanta que a função save já esteja implementada na classe base AirtableModel para persistir as alterações
}

module.exports = Currency;
