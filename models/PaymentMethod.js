const AirtableModel = require('./AirtableModel');

class PaymentMethod extends AirtableModel {
  constructor() {
    super('Formas de pagamento');
  }

  setNome(value) {
    this.setAttribute('Nome', value);
  }

  getNome() {
    return this.getAttribute('Nome');
  }

  setSlug(value) {
    this.setAttribute('Slug', value);
  }

  getSlug() {
    return this.getAttribute('Slug');
  }

  setDescricao(value) {
    this.setAttribute('Descrição', value);
  }

  getDescricao() {
    return this.getAttribute('Descrição');
  }

  setTipo(value) {
    this.setAttribute('Tipo', value);
  }

  getTipo() {
    return this.getAttribute('Tipo');
  }

  async findBySlug(slug) {
    return await this.findBy('Slug', slug);
  }

  async findByName(name) {
    return await this.findBy('Nome', name);
  }
}

module.exports = PaymentMethod;
