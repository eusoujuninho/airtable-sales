const AirtableModel = require('./AirtableModel');
const Country = require('./Country');

class Address extends AirtableModel {
  constructor() {
    super('Endereços');
    this.countryModel = new Country(); // Instancia o modelo de Country
  }


  // Define o nome do endereço
  setName(name) {
    this.setAttribute('Nome', name);
  }

  // Define o endereço
  setAddress(address) {
    this.setAttribute('Endereço', address);
  }

  // Define o número do endereço
  setNumber(number) {
    this.setAttribute('Número', number);
  }

  // Define o complemento do endereço
  setComplement(complement) {
    this.setAttribute('Complemento', complement);
  }

  // Define a cidade do endereço
  setCity(city) {
    this.setAttribute('Cidade', city);
  }

  // Define o CEP do endereço
  setPostalCode(postalCode) {
    this.setAttribute('CEP', postalCode);
  }

  // Define o país do endereço
  setCountry(country) {
    this.setAttribute('País', country); // Se for o ID do país na tabela de países
  }

  // Define a data de criação do endereço
  setCreatedAt(createdAt) {
    this.setAttribute('Criado em', createdAt);
  }

  // Define a data de atualização do endereço
  setUpdatedAt(updatedAt) {
    this.setAttribute('Atualizado em', updatedAt);
  }

  // Obtém o nome do endereço
  getName() {
    return this.getAttribute('Nome');
  }

  // Obtém o endereço
  getAddress() {
    return this.getAttribute('Endereço');
  }

  // Obtém o número do endereço
  getNumber() {
    return this.getAttribute('Número');
  }

  // Obtém o complemento do endereço
  getComplement() {
    return this.getAttribute('Complemento');
  }

  // Obtém a cidade do endereço
  getCity() {
    return this.getAttribute('Cidade');
  }

  // Obtém o CEP do endereço
  getPostalCode() {
    return this.getAttribute('CEP');
  }

  // Obtém o país do endereço
  getCountry() {
    return this.getAttribute('Country'); // Pode retornar o ID do país
  }

  // Obtém a data de criação do endereço
  getCreatedAt() {
    return this.getAttribute('Criado em');
  }

  // Obtém a data de atualização do endereço
  getUpdatedAt() {
    return this.getAttribute('Atualizado em');
  }

  async createAddress(addressDetails) {
    try {
      // Verifica e busca o país, se necessário
      await this.resolveCountry(addressDetails);

      // Preenche os atributos do endereço com os detalhes fornecidos
      this.fill(addressDetails);

      // Cria o registro no Airtable e retorna o objeto Address atualizado
      await this.create(this.attributes);
      return this;
    } catch (error) {
      console.error('Error creating address:', error);
      return null;
    }
  }

  async resolveCountry(addressDetails) {
    let countryIdentifier = this.getCountry();

    console.log(countryIdentifier);
    return;

    // Adiciona uma verificação para garantir que countryIdentifier é definido
    if (!countryIdentifier) {
        console.error("Country identifier is undefined.");
        return;
    }

    let country = null;

    // Verifica se countryIdentifier não é um objeto
    if (typeof countryIdentifier !== 'object') {
      // Agora verifica se countryIdentifier é definido antes de acessar length
      if (countryIdentifier.length === 2) {
        if (/^[a-zA-Z]{2}$/.test(countryIdentifier)) {
          country = await this.countryModel.findByAlpha2(countryIdentifier);
        } else if (/^\d{2}$/.test(countryIdentifier)) {
          country = await this.countryModel.findById(countryIdentifier);
        }
      } else {
        country = await this.countryModel.findByName(countryIdentifier);
      }

      if (country) {
        addressDetails['Country'] = country.id;
      } else {
        throw new Error(`Country not found with identifier: ${countryIdentifier}`);
      }
    }
    // Se countryIdentifier já for um objeto, não precisa buscar
}


  async findAddressByCity(city) {
    try {
      // Busca o primeiro endereço que corresponde à cidade fornecida
      const addressRecord = await this.findBy('Cidade', city);
      if (addressRecord) {
        // Atualiza os atributos locais com os dados encontrados
        this.fill(addressRecord);
        return this;
      }
      return null;
    } catch (error) {
      console.error(`Error finding address in city ${city}:`, error);
      return null;
    }
  }
  
}

module.exports = Address;
