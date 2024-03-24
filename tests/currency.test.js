const { base } = require('../config');
const Currency = require('../models/currency.js');

describe('Currency', () => {
  it('should find currency by code', async () => {
    const currencyModel = new Currency(base); // Passando o objeto base
    const currency = await currencyModel.findByCode('USD');

    expect(currency).toBeDefined();
    expect(currency.code).toEqual('USD');
  });

  it('should return null if currency is not found', async () => {
    const currencyModel = new Currency(base); // Passando o objeto base
    const currency = await currencyModel.findByCode('INVALID');

    expect(currency).toBeNull();
  });
});
