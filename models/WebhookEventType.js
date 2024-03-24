const AirtableModel = require('./AirtableModel');

class WebhookEventType extends AirtableModel {
  constructor() {
    super('Tipos de eventos de Webhook');
  }

  // Define o nome do tipo de evento
  setName(name) {
    this.setAttribute('Nome', name);
  }

  // Define os identificadores do tipo de evento
  setIdentifiers(identifiers) {
    this.setAttribute('Identificadores', identifiers);
  }

  // Obtém o nome do tipo de evento
  getName() {
    return this.getAttribute('Nome');
  }

  // Obtém os identificadores do tipo de evento
  getIdentifiers() {
    return this.getAttribute('Identificadores');
  }

  async findByIdentifier(identifier) {
    try {
      // Realiza a busca na tabela de tipos de eventos de webhook
      const records = await this.base(this.tableName)
        .select({
          filterByFormula: `FIND('${identifier}', {Identificadores}) > 0`
        })
        .firstPage();

      // Retorna os registros encontrados
      return records.map(record => record.fields);
    } catch (error) {
      console.error('Error finding webhook event type by identifier:', error);
      return null;
    }
  }
  
}

module.exports = WebhookEventType;
