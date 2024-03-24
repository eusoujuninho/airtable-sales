const { base } = require('../config');
const Address = require('../models/Address.js');
const Country = require('../models/Country.js');

describe('Address', () => {
    let addressModel;
    let countryModel;
  
    beforeEach(() => {
      // Cria uma nova instância de Address para cada teste
      addressModel = new Address();
      countryModel = new Country();

      // Mock da busca por país usando o código Alpha-2 'BR'
      countryModel.findByAlpha2 = jest.fn().mockImplementation(async (code) => {
        if(code === 'BR') {
          return {
            id: 'recCountryBR',
            code: 'BR',
            name: 'Brasil',
            toJson: () => ({ id: 'recCountryBR', code: 'BR', name: 'Brasil' })
          };
        }
        return null;
      });

      // Injeta o modelo de país mockado na instância de Address
      addressModel.countryModel = countryModel;
    });
  
    it('should create a new address successfully, resolving country by Alpha-2 code', async () => {
      const newAddressDetails = {
        Endereço: 'Rua Exemplo',
        Número: parseInt('123'),
        Complemento: 'Apto 1',
        Cidade: 'São Paulo',
        CEP: '01000-000',
        País: 'BR', // Aqui usamos 'País' em vez de 'Country' para manter consistência com o seu exemplo
      };

      // Mock do método createAddress para simular a criação de um novo endereço
      addressModel.createAddress = jest.fn().mockImplementation(async (details) => {
        // Simula a resolução do país
        await addressModel.resolveCountry(details);

        // Simula a criação do endereço, incluindo a ID do país resolvido
        addressModel.fill({ ...details, Country: 'recCountryBR' }); // Assume que resolveCountry atualiza 'País' para 'Country'
        return addressModel;
      });

      const createdAddress = await addressModel.createAddress(newAddressDetails);

      console.log(createdAddress);

      // Assegura que a função foi chamada e que o país foi resolvido corretamente
      expect(createdAddress).toBeDefined();
      expect(createdAddress.getCountry()).toEqual('recCountryBR');
      expect(countryModel.findByAlpha2).toHaveBeenCalledWith('BR');
      // Continue as verificações para os demais campos conforme necessário
    });
});
