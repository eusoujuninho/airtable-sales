const { base } = require('../config');
const Country = require('../models/country.js');

describe('Country', () => {
  it('should find country by alpha-2 code', async () => {
    const countryModel = new Country(base);
    const country = await countryModel.findByAlpha2('US');

    expect(country).toBeDefined();
    expect(country.name).toEqual('United States of America');
});
});
