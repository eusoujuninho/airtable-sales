const fs = require('fs').promises;
const path = require('path');
const { base } = require("./config");
const { HotmartWebhookAdapter } = require("./adapters/HotmartWebhookAdapter.js");
const { DoppusWebhookAdapter } = require("./adapters/DoppusWebhookAdapter.js");
const Marketplace = require('./models/Marketplace.js');
const Offer = require('./models/Offer.js');
const Country = require('./models/Country.js');
const Address = require('./models/Address.js');
const ProducerModel = require('./models/Producer.js');
const ProductModel = require('./models/Product.js');
const PaymentMethod = require('./models/PaymentMethod.js');
const TransactionStatus = require('./models/TransactionStatus.js');
const { readJsonFile } = require('./helpers/readJsonFile.js');

async function determineAdapter(platform) {
    const adapters = {
        hotmart: HotmartWebhookAdapter,
        doppus: DoppusWebhookAdapter
    };
    const AdapterClass = adapters[platform.toLowerCase()];
    if (!AdapterClass) throw new Error("Plataforma desconhecida ou não suportada");
    return new AdapterClass();
}

async function handleWebhook(data) {
    const adapter = await determineAdapter(data.platform ?? 'hotmart');
    const adaptedData = await adapter.adapt(data);

    return adaptedData;
  }

  async function main() {
    const exampleData = await readJsonFile(path.join(__dirname, 'example.json'));
    const adaptedData = await handleWebhook(exampleData);

    const offerData = adaptedData.purchase.offer;
    const purchaseData = adaptedData.purchase.payment;
    const purchaseMethod = purchaseData.method;

    console.log(adaptedData);

    // Asumindo que requestMarketplace contém o slug para buscar
    const marketplaceModel = new Marketplace();
    const offerModel = new Offer();
    const countryModel = new Country();
    const addressModel = new Address();
    const paymentMethodModel = new PaymentMethod();
    const transactionStatusModel = new TransactionStatus();
    const producerModel = new ProducerModel();
    const productModel = new ProductModel();

    const marketplace = await marketplaceModel.findBySlug(adaptedData.getMarketplace());
    const offer = await offerModel.findByCode(`00001`);
    const country = await countryModel.findByAlpha2(adaptedData.getBuyer().address.country_iso);
    const paymentMethod = await paymentMethodModel.findBySlug(purchaseMethod);
    const transactionStatus = await transactionStatusModel.findBySlug(adaptedData.getPurchase().status);
    const producer = await producerModel.findByName(adaptedData.getProducer().name);

    console.log(transactionStatus);


    const address = await addressModel.create({
      'Endereço': adaptedData.getBuyer().address.address,
      'Número': parseInt(adaptedData.getBuyer().address.number),
      'Complemento': adaptedData.getBuyer().address.complement,
      'Cidade': adaptedData.getBuyer().address.city,
      'CEP': adaptedData.getBuyer().address.zipcode,
      'Estado': adaptedData.getBuyer().address.state,
      'País': [country.getId()]
    });
    

}

main().catch(console.error);