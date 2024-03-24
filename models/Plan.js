const AirtableModel = require('./AirtableModel');

class Plan extends AirtableModel {
  constructor() {
    super('Planos');
    this.attributes = {}; // Inicialização do objeto de atributos
  }

  // Método para definir o ID Externo
  setIdExterno(value) {
    this.setAttribute('ID Externo', value);
  }

  // Método para obter o ID Externo
  getIdExterno() {
    return this.getAttribute('ID Externo');
  }

  // Método para definir o Nome
  setNome(value) {
    this.setAttribute('Nome', value);
  }

  // Método para obter o Nome
  getNome() {
    return this.getAttribute('Nome');
  }

  // Implementação dos métodos findBy para buscar planos por ID Externo ou Nome, se necessário
}

module.exports = Plan;
