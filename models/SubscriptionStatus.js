const AirtableModel = require('./AirtableModel');

class SubscriptionStatus extends AirtableModel {
  constructor() {
    super('Status de Assinaturas');
  }

  // Define o nome do status de assinatura
  setName(name) {
    this.setAttribute('Nome', name);
  }

  // Define o slug do status de assinatura
  setSlug(slug) {
    this.setAttribute('Slug', slug);
  }

  // Define o tipo do status de assinatura
  setType(type) {
    this.setAttribute('Tipo', type);
  }

  // Obtém o nome do status de assinatura
  getName() {
    return this.getAttribute('Nome');
  }

  // Obtém o slug do status de assinatura
  getSlug() {
    return this.getAttribute('Slug');
  }

  // Obtém o tipo do status de assinatura
  getType() {
    return this.getAttribute('Tipo');
  }

  async findByIdentifier(identifier) {
    try {
      // Realiza a busca na tabela de status de assinaturas
      const records = await this.base(this.tableName)
        .select({
          filterByFormula: `FIND('${identifier}', {Identificadores}) > 0`
        })
        .firstPage();

      // Retorna os registros encontrados
      return records.map(record => record.fields);
    } catch (error) {
      console.error('Error finding subscription status by identifier:', error);
      return null;
    }
  }
}

module.exports = SubscriptionStatus;
