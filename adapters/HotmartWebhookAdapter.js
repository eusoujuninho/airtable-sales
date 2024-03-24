const { WebhookAdapter } = require('./WebhookAdapter.js');
const { WebhookRequest } = require('./WebhookRequest.js');

class HotmartWebhookAdapter extends WebhookAdapter {
    async adapt(data) {
        this.normalizeData(data);

        const webhookRequest = new WebhookRequest();
        webhookRequest.setEvent(data.event, data.id);
        webhookRequest.setCreatedAt(this.convertToIsoString(data.creation_date));
        webhookRequest.setMarketplace(data.platform);
        webhookRequest.setProduct(this.mapProductDetails(data.data.product));

        data.data.affiliates.forEach(affiliate => {
            webhookRequest.addAffiliate(this.mapAffiliateDetails(affiliate));
        });

        webhookRequest.setBuyer(data.data.buyer);
        webhookRequest.setProducer(data.data.producer);

        data.data.commissions.forEach(commission => {
            webhookRequest.addCommission(this.mapCommissionDetails(commission));
        });

        webhookRequest.setPurchase(this.mapPurchaseDetails(data.data.purchase));
        webhookRequest.setSubscription(this.mapSubscriptionDetails(data.data.subscription));

        return webhookRequest;
    }

    normalizeData(data) {
        data.event = data.event || 'UNKNOWN_EVENT';
        data.platform = data.platform || 'hotmart';
        data.id = data.id || 'UNKNOWN_ID';
        data.creation_date = data.creation_date || 0;

        data.data = data.data || {};
        data.data.buyer = data.data.buyer || {};
        data.data.producer = data.data.producer || {};
        data.data.commissions = Array.isArray(data.data.commissions) ? data.data.commissions : [];
        data.data.product = data.data.product || {};
        data.data.affiliates = Array.isArray(data.data.affiliates) ? data.data.affiliates : [];
        data.data.purchase = data.data.purchase || {};
        data.data.subscription = data.data.subscription || {};

        data.data.product.id = data.data.product.id || 'UNKNOWN_PRODUCT_ID';
        data.data.product.code = data.data.product.code || 'N/A';
        data.data.product.name = data.data.product.name || 'Unnamed Product';
        data.data.product.has_co_production = data.data.product.has_co_production || false;

        data.data.purchase.approved_date = data.data.purchase.approved_date || 0;
        data.data.purchase.full_price = data.data.purchase.full_price || { value: 0, currency: 'N/A' };
        data.data.purchase.original_offer_price = data.data.purchase.original_offer_price || { value: 0, currency: 'N/A' };
        data.data.purchase.price = data.data.purchase.price || { value: 0, currency_value: 'N/A' };
        data.data.purchase.checkout_country = data.data.purchase.checkout_country || { name: 'N/A', code: 'N/A' };
        data.data.purchase.order_bump = data.data.purchase.order_bump || { is_order_bump: false };
    }

    mapProductDetails(product) {
        return {
            id: product.id,
            code: product.code,
            name: product.name,
            has_co_production: product.has_co_production
        };
    }

    mapAffiliateDetails(affiliate) {
        return {
            code: affiliate.affiliate_code,
            name: affiliate.name
        };
    }

    mapCommissionDetails(commission) {
        return {
            value: commission.value,
            currency: commission.currency_value,
            source: commission.source
        };
    }

    mapPurchaseDetails(purchase) {
        return {
            createdAt: this.convertToIsoString(purchase.order_date),
            approvedAt: this.convertToIsoString(purchase.approved_date),
            price: {
                full: {
                    value: purchase.full_price?.value || 0,
                    currency: purchase.full_price?.currency || 'N/A'
                }
            },
            offer: this.mapOfferDetails(purchase.original_offer_price, purchase.transaction),
            currency: purchase.price?.currency_value || 'N/A',
            checkout: {
                country: purchase.checkout_country?.name || 'N/A',
                code: purchase.checkout_country?.code || 'N/A'
            },
            isOrderBump: purchase.order_bump?.is_order_bump || false,
            status: purchase.status,
            transaction: this.mapTransactionDetails(purchase.transaction),
            payment: this.mapPaymentDetails(purchase.payment)
        };
    }

    mapOfferDetails(offer, transaction) {
        return {
            price: offer.value,
            currency: offer.currency,
            code:
            offer.code,
            transaction: transaction?.code || 'N/A'
        };
    }

    mapTransactionDetails(transaction) {
        return {
            code: transaction.code || 'N/A',
            parent: transaction.parent || 'N/A'
        };
    }

    mapPaymentDetails(payment) {
        return {
            billet: {
                barCode: payment.billet_barcode || 'N/A',
                url: payment.billet_url || 'N/A'
            },
            installments_number: payment.installments_number,
            pix: this.mapPixDetails(payment.pix_code, payment.pix_expiration_date, payment.pix_qrcode),
            refusalReason: payment.refusal_reason || 'N/A',
            method: payment.type || 'N/A'
        };
    }

    mapPixDetails(code, expiration_date, qrcode) {
        return {
            code: code || 'N/A',
            expirationDate: this.convertToIsoString(expiration_date),
            qrCode: qrcode || 'N/A'
        };
    }

    mapSubscriptionDetails(subscription) {
        return {
            status: subscription.status,
            plan: this.mapPlanDetails(subscription.plan),
            code: subscription.subscriber?.code || 'N/A',
            recurrencyNumber: subscription.recurrencyNumber || 0,
            dateNextCharge: this.convertToIsoString(subscription.dateNextCharge),
            anticipationPurchase: subscription.anticipationPurchase || false
        };
    }

    mapPlanDetails(plan) {
        return {
            id: plan.id || 'N/A',
            name: plan.name || 'N/A'
        };
    }

    convertToIsoString(date) {
        if (typeof date === 'number' && date > 0) {
            return new Date(date * 1000).toISOString();
        } else {
            console.warn('Data inválida fornecida para conversão:', date);
            return 'Data não disponível';
        }
    }
}

module.exports = { HotmartWebhookAdapter };