const AirtableModel = require('./AirtableModel');

class Product extends AirtableModel {
  constructor() {
    super('Produtos');
  }

  // Define o nome do produto
  setName(name) {
    this.setAttribute('Nome', name);
  }

  // Define o produtor do produto
  setProducer(producerId) {
    this.setAttribute('Produtor', [producerId]); // Supondo que 'Produtor' seja um campo de relação
  }

  // Define o idioma do produto
  setLanguage(language) {
    this.setAttribute('Idioma', language);
  }

  // Obtém o nome do produto
  getName() {
    return this.getAttribute('Nome');
  }

  // Obtém o ID do produtor do produto
  getProducer() {
    return this.getAttribute('Produtor');
  }

  // Obtém o idioma do produto
  getLanguage() {
    return this.getAttribute('Idioma');
  }
}

module.exports = Product;
