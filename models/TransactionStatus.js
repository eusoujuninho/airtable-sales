const AirtableModel = require('./AirtableModel');

class TransactionStatus extends AirtableModel {
  constructor() {
    super('Status de Transações');
  }

  // Métodos para configurar os atributos
  setNome(value) {
    this.setAttribute('Nome', value);
  }

  setSlug(value) {
    this.setAttribute('Slug', value);
  }

  setTipo(value) {
    this.setAttribute('Tipo', value);
  }

  // Métodos para obter os valores dos atributos
  getNome() {
    return this.getAttribute('Nome');
  }

  getSlug() {
    return this.getAttribute('Slug');
  }

  getTipo() {
    return this.getAttribute('Tipo');
  }

  async findBySlug(slug) {
    const record = await this.findBy('Slug', slug.toLowerCase());
    this.fill(record);

    return this;
  }

  // Salva as alterações ou cria um novo registro com os atributos atuais
  async save() {
    if (this.attributes['id']) {
      // Se um ID está presente, atualiza o registro existente
      return await this.update(this.attributes['id'], this.attributes);
    } else {
      // Senão, cria um novo registro no Airtable
      return await this.create(this.attributes);
    }
  }
}

module.exports = TransactionStatus;