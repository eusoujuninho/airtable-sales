const AirtableModel = require('./AirtableModel');

class ExchangeRate extends AirtableModel {
  constructor() {
    super('Taxa de câmbio');
    this.attributes = {}; // Inicialização do objeto de atributos
  }

  // Métodos para manipulação de atributos específicos
  setDate(value) {
    this.setAttribute('Data', value); // Supondo que 'Data' é o nome do campo no Airtable
  }

  setCurrencyId(value) {
    this.setAttribute('Moeda', [value]); // 'Moeda' é um array de IDs referenciando a tabela Moedas
  }

  setExchangeRate(value) {
    this.setAttribute('Taxa de Câmbio', value); // Supondo que 'Taxa de Câmbio' é o nome do campo no Airtable
  }

  // Obtém os atributos
  getDate() { return this.getAttribute('Data'); }
  getCurrencyId() { return this.getAttribute('Moeda'); }
  getExchangeRate() { return this.getAttribute('Taxa de Câmbio'); }
  
  // Garanta que a função save já esteja implementada na classe base AirtableModel para persistir as alterações
}
