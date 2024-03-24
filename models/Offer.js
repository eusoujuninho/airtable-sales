const AirtableModel = require('./AirtableModel');

class Offer extends AirtableModel {
  constructor(airtableInstance, currencyModel, marketplaceModel, productModel) {
    super('Ofertas');
    this.airtable = airtableInstance;
    this.currencyModel = currencyModel;
    this.marketplaceModel = marketplaceModel;
    this.productModel = productModel;
  }

  async findByCode(code) {
    try {
      const record = await this.findBy('Código', code);

      if (!record) {
        return null; // Retorna nulo se nenhum registro for encontrado
      }

      this.fill(record);
      return this;

      // Se o registro for encontrado, inicializa uma nova instância de Offer com os campos do registro
      // const offerInstance = new Offer(this.airtable, this.currencyModel, this.marketplaceModel, this.productModel);
      // offerInstance.fill(record.fields);
      // offerInstance.id = record.id;

      // return offerInstance;


    } catch (error) {
      console.error('Erro ao buscar a oferta pelo código:', error);
      return null;
    }
  }


  async findOrCreateByCode(code, additionalFields = {}) {
    let record = await this.findBy('Código', code);

    if (!record) {
      record = await this.create({ 'Código': code, ...additionalFields });
      if (!record) {
        throw new Error('Falha ao criar uma nova oferta.');
      }
    }

    // Inicializa a instância de Offer com os campos do registro encontrado ou criado
    const offerInstance = new Offer(this.airtable, this.currencyModel, this.marketplaceModel, this.productModel);
    if (record && record.fields) {
      offerInstance.fill(record.fields);
      offerInstance.id = record.id; // Supondo que cada oferta tem um ID único
    } else {
      throw new Error('Campos do registro estão indefinidos.');
    }

    return offerInstance;
  }

  
  setMarketplace(marketplace) {
    this.setAttribute('Marketplace', marketplace);
    return this;
  }

  setCurrency(currency) {
    this.setAttribute('Moeda', currency);
    return this;
  }

  setProduct(product) {
    this.setAttribute('Produto', product);
    return this;
  }

  async validateFields(additionalFields) {
    if (additionalFields['Moeda']) {
      await this.validateCurrency(additionalFields['Moeda']);
    }

    if (additionalFields['Marketplace']) {
      await this.validateMarketplace(additionalFields['Marketplace']);
    }

    if (additionalFields['Produto']) {
      await this.validateProduct(additionalFields['Produto']);
    }
  }

  async validateCurrency(currency) {
    const currencyObject = await this.getModelObject(currency, this.currencyModel);
    this.setCurrency(currencyObject);
  }

  async validateMarketplace(marketplace) {
    const marketplaceObject = await this.getModelObject(marketplace, this.marketplaceModel);
    this.setMarketplace(marketplaceObject);
  }

  async validateProduct(product) {
    const productObject = await this.getModelObject(product, this.productModel);
    this.setProduct(productObject);
  }

  async loadRelatedModels() {
    if (this.getAttribute('Marketplace')) {
      // Supondo que você tenha um método para buscar um marketplace por ID no modelo Marketplace
      this.marketplaceDetails = await this.marketplaceModel.findById(this.getAttribute('Marketplace')[0]);
    }
    if (this.getAttribute('Produto')) {
      // Supondo que você tenha um método para buscar um produto por ID no modelo Product
      this.productDetails = await this.productModel.findById(this.getAttribute('Produto')[0]);
    }
    if (this.getAttribute('Moeda')) {
      // Supondo que você tenha um método para buscar uma moeda por ID no modelo Currency
      this.currencyDetails = await this.currencyModel.findById(this.getAttribute('Moeda')[0]);
    }
  }  
  toJson() {
    return {
      ...this.attributes,
      MarketplaceDetails: this.marketplaceDetails ? this.marketplaceDetails.toJson() : null,
      ProductDetails: this.productDetails ? this.productDetails.toJson() : null,
      CurrencyDetails: this.currencyDetails ? this.currencyDetails.toJson() : null,
    };
  }
  
}

module.exports = Offer;
