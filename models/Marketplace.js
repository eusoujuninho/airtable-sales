const AirtableModel = require('./AirtableModel');

class Marketplace extends AirtableModel {
  constructor() {
    super('Marketplaces');
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

// Exemplo de método findById no modelo Marketplace
async findById(id) {
  const record = await this.find(id);
  if (record) {
    this.fill(record);
    return this;
  } else {
    return null;
  }
}


  // Aqui, você pode adicionar métodos específicos para a tabela Status de Assinaturas
  // Por exemplo, encontrar um status pelo slug
  async findBySlug(slug) {
    const record = await this.findBy('Slug', slug);
    this.fill(record);
    return this;
  }

  async findByName(name) {
    return await this.findBy('Nome', name);
  }
}

module.exports = Marketplace;
