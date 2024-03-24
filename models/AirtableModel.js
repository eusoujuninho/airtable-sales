const AirtableBase = require('./AirtableBase');
const { getModelObject } = require('./ModelUtilities');

class AirtableModel extends AirtableBase {
  constructor(tableName) {
    super(tableName);
    this.attributes = {};
    this.errors = [];
  }

  setAttribute(key, value) {
    this.attributes[key] = value;
  }

  getAttribute(key) {
    return this.attributes[key];
  }

  fill(fields) {
    Object.keys(fields).forEach(key => {
      this.setAttribute(key, fields[key]);
    });
  }

  toJson() {
    return {
      ...this.attributes,
      MarketplaceDetails: this.marketplaceDetails ? this.marketplaceDetails.toJson() : null,
      ProductDetails: this.productDetails ? this.productDetails.toJson() : null,
      CurrencyDetails: this.currencyDetails ? this.currencyDetails.toJson() : null,
    };
  }
  

  // Exemplo de uso da função getModelObject (deve ser ajustado conforme a necessidade)
  async loadRelatedModel(param, model) {
    return getModelObject(param, model);
  }
}

module.exports = AirtableModel;
