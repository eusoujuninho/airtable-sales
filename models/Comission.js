const AirtableModel = require('./AirtableModel');

class Comission extends AirtableModel {
  constructor() {
    super('Comissões');
  }

  // Métodos para manipulação de atributos específicos
  setIdExterno(value) {
    this.setAttribute('ID Externo', value);
  }

  getIdExterno() {
    return this.getAttribute('ID Externo');
  }

  setTipoComissao(value) {
    this.setAttribute('Tipo de Comissão', value);
  }

  getTipoComissao() {
    return this.getAttribute('Tipo de Comissão');
  }

  setMoeda(value) {
    // Aqui esperamos receber o ID da moeda como valor
    this.setAttribute('Moeda', value);
  }

  getMoeda() {
    return this.getAttribute('Moeda');
  }

  setTaxaCambio(value) {
    this.setAttribute('Taxa de Câmbio', value);
  }

  getTaxaCambio() {
    return this.getAttribute('Taxa de Câmbio');
  }

  setValorFinal(value) {
    this.setAttribute('Valor Final - R$', value);
  }

  getValorFinal() {
    return this.getAttribute('Valor Final - R$');
  }

}

module.exports = Comission;
