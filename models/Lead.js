class Lead extends AirtableModel {
  constructor() {
    super('Leads');
  }

  async findOrCreateByEmail(email, additionalFields = {}) {
    // Tenta encontrar um lead pelo e-mail
    const existingLead = await this.findBy('E-mail', email);
    if (existingLead) {
      // Se encontrar, retorna o lead existente
      return existingLead;
    } else {
      // Se não encontrar, cria um novo lead com o e-mail e quaisquer campos adicionais fornecidos
      const fields = { 'E-mail': email, ...additionalFields };
      const newLead = await this.create(fields);
      return newLead;
    }
  }
}

module.exports = Lead;
