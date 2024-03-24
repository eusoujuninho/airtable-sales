const AirtableModel = require('./AirtableModel');

class Producer extends AirtableModel {
  constructor() {
    super('Produtores');
    this.attributes = {}; // Inicialização do objeto de atributos
  }

  // Método para definir o Nome
  setNome(value) {
    this.setAttribute('Nome', value);
  }

  // Método para obter o Nome
  getNome() {
    return this.getAttribute('Nome');
  }

  // Método já implementado para buscar um produtor pelo nome
  async findByName(name) {
    const producerRecord = await this.findBy('Nome', name);
    if (producerRecord) {
      // Atualiza os atributos locais com os dados encontrados
      this.setNome(producerRecord.Nome);
    }
    return producerRecord;
  }
}

module.exports = Producer;
