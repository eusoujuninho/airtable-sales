const AirtableModel = require('./AirtableModel');

class Subscription extends AirtableModel {
  constructor() {
    super('Assinaturas');
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

  // Método para definir o Lead associado à assinatura
  // Espera-se o ID do Lead como valor
  setLead(leadId) {
    this.setAttribute('Lead', leadId);
  }

  // Método para obter o Lead associado
  getLead() {
    return this.getAttribute('Lead');
  }

  // Implementar métodos adicionais conforme necessário, por exemplo:
  // - Buscar uma assinatura pelo ID Externo
  // - Associar uma assinatura a um Lead existente
  // - Criar ou atualizar uma assinatura com base no ID Externo e Lead
}

module.exports = Subscription;
