const { base } = require('../config');
const Offer = require('../models/Offer.js');
const Currency = require('../models/Currency.js');
const Marketplace = require('../models/Marketplace.js');
const Product = require('../models/Product.js');

describe('Offer', () => {
  let offerModel;
  let currencyModel;
  let marketplaceModel;
  let productModel;

  beforeAll(() => {
    // Instancia os modelos
    currencyModel = new Currency();
    marketplaceModel = new Marketplace();
    productModel = new Product();

    // Configura os mocks para findById de cada modelo relacionado
    currencyModel.findById = jest.fn().mockResolvedValue({ toJson: () => ({ code: 'BRL', name: 'Real Brasileiro' }) });
    marketplaceModel.findById = jest.fn().mockResolvedValue({ toJson: () => ({ name: 'Hotmart' }) });
    productModel.findById = jest.fn().mockResolvedValue({ toJson: () => ({ name: 'Curso de Teste' }) });

    offerModel = new Offer(base, currencyModel, marketplaceModel, productModel);
  });

  it('should create a new offer with provided details, including BRL currency', async () => {
    // Dados fictícios para a criação da oferta
    const newOfferData = {
      'Código': '00003',
      'Produto': 'recProd456', // ID fictício do Produto
      'Moeda': 'recCurrBRL', // Simula o ID da moeda BRL
      'Marketplace': 'recMark012', // ID fictício do Marketplace
      'Valor': 50,
    };

    // Simula a busca pela moeda BRL pelo modelo Currency
    currencyModel.findByCode = jest.fn().mockResolvedValue(new Currency().fill({ code: 'BRL', name: 'Real Brasileiro' }));

    // Mock da função create do modelo Offer para simular a criação de uma nova oferta
    offerModel.create = jest.fn().mockImplementation(async (fields) => {
      const mockOffer = new Offer(base, currencyModel, marketplaceModel, productModel);
      mockOffer.fill({
        ...fields,
        'ID': 'recNew123', // Simulando um ID gerado pelo sistema
      });
      // Assume que loadRelatedModels carrega os detalhes baseados nos IDs
      await mockOffer.loadRelatedModels(); 
      return mockOffer;
    });

    const createdOffer = await offerModel.create(newOfferData);

    // Verifica se a função create foi chamada corretamente
    expect(offerModel.create).toHaveBeenCalledWith(newOfferData);

    // Assertivas para verificar os detalhes da oferta criada
    expect(createdOffer.getAttribute('Código')).toEqual(newOfferData['Código']);
    expect(createdOffer.getAttribute('Valor')).toEqual(newOfferData['Valor']);

    // Verifica os detalhes dos modelos relacionados
    expect(createdOffer.currencyDetails.toJson()).toEqual(expect.objectContaining({ code: 'BRL', name: 'Real Brasileiro' }));
    // Verificações adicionais para Produto e Marketplace, conforme necessário
  });
});
