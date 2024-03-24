const { WebhookAdapter } = require('./WebhookAdapter.js');

class DoppusWebhookAdapter extends WebhookAdapter {
    adapt(data) {
      return {
        transactionId: data.data.transaction_code,
        creationDate: data.data.registration_date,
        eventType: 'PURCHASE', // Este campo precisa ser ajustado de acordo com a lógica necessária
        buyerDetails: {
          email: data.data.customer.email,
          name: data.data.customer.name,
          address: `${data.data.address.address}, ${data.data.address.city}, ${data.data.address.state}, ${data.data.address.country}`,
          phone: data.data.customer.phone,
        },
        purchaseDetails: {
          price: data.data.transaction.sale_price,
          currency: 'BRL', // Supondo que a moeda seja sempre BRL
          status: data.data.status_text,
        }
      };
    }
  }