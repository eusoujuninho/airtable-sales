const AirtableModel = require('./AirtableModel');

class Country extends AirtableModel {
  constructor(airtableInstance) {
    super('Países');
    this.airtable = airtableInstance;
    this.base = airtableInstance;
    this.attributes = {};
  }

  // Métodos de definição
  setName(value) { this.setAttribute('name', value); }
  setAlpha2(value) { this.setAttribute('alpha-2', value); }
  setAlpha3(value) { this.setAttribute('alpha-3', value); }
  setCountryCode(value) { this.setAttribute('country-code', value); }
  setIso31662(value) { this.setAttribute('iso_3166-2', value); }
  setRegion(value) { this.setAttribute('region', value); }
  setSubRegion(value) { this.setAttribute('sub-region', value); }
  setIntermediateRegion(value) { this.setAttribute('intermediate-region', value); }
  setRegionCode(value) { this.setAttribute('region-code', value); }
  setSubRegionCode(value) { this.setAttribute('sub-region-code', value); }
  setIntermediateRegionCode(value) { this.setAttribute('intermediate-region-code', value); }

  // Métodos de obtenção
  getName() { return this.getAttribute('name'); }
  getAlpha2() { return this.getAttribute('alpha-2'); }
  getAlpha3() { return this.getAttribute('alpha-3'); }
  getCountryCode() { return this.getAttribute('country-code'); }
  getIso31662() { return this.getAttribute('iso_3166-2'); }
  getRegion() { return this.getAttribute('region'); }
  getSubRegion() { return this.getAttribute('sub-region'); }
  getIntermediateRegion() { return this.getAttribute('intermediate-region'); }
  getRegionCode() { return this.getAttribute('region-code'); }
  getSubRegionCode() { return this.getAttribute('sub-region-code'); }
  getIntermediateRegionCode() { return this.getAttribute('intermediate-region-code'); }

  async findByName(name) {
    try {
      const records = await this.base(this.tableName)
        .select({
          filterByFormula: `{name} = "${name}"`
        })
        .firstPage();
      return records.map(record => record.fields);
    } catch (error) {
      console.error('Error finding country by name:', error);
      return null;
    }
  }

  async findByRegion(region) {
    try {
      const records = await this.base(this.tableName)
        .select({
          filterByFormula: `{region} = "${region}"`
        })
        .firstPage();
      return records.map(record => record.fields);
    } catch (error) {
      console.error('Error finding country by region:', error);
      return null;
    }
  }

  async findBySubRegion(subRegion) {
    try {
      const records = await this.base(this.tableName)
        .select({
          filterByFormula: `{sub-region} = "${subRegion}"`
        })
        .firstPage();
      return records.map(record => record.fields);
    } catch (error) {
      console.error('Error finding country by sub-region:', error);
      return null;
    }
  }

  async findByAlpha2(alpha2) {
    const record = await this.findBy('alpha-2', alpha2);
    this.fill(record);
    return this;
  }

}

module.exports = Country;
