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
        data.data.buyer = {
            name: data.data.buyer.name,
            email: data.data.buyer.email,
            phone: data.data.buyer.checkout_phone,
            address: {
                address: data.data.buyer.address.address,
                number: data.data.buyer.address.number,
                complement: data.data.buyer.address.complement,
                zip: data.data.buyer.address.zipcode,
                city: {
                    name: data.data.buyer.address.city,
                    state: data.data.buyer.address.state,
                },
                country: {
                    name: data.data.buyer.address.country,
                    code: data.data.buyer.address.country_iso
                }
            }
        }
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
            code: product.ucode,
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
            checkout: {
                country: {
                    name: purchase.checkout_country.name,
                    iso: purchase.checkout_country.iso
                }
            },
            status: purchase.status,
            transaction: {
                code: purchase.transaction,
                isOrderBump: purchase.order_bump?.is_order_bump || false,
                parent: {
                    code: purchase.order_bump.parent_purchase_transaction
                }
            },
            payment: this.mapPaymentDetails(purchase),
            offer: {
                code: purchase.offer.code,
                original: {
                    price: purchase.original_offer_price.value,
                    currency: purchase.original_offer_price.currency_value
                },
                value: purchase.price.value,
                currency: purchase.price.currency_value
            }
        };
    }

    mapPaymentDetails(purchase) {
        return {
            details: {
                billet: {
                    barCode: purchase.payment.billet_barcode || 'N/A',
                    url: purchase.payment.billet_url || 'N/A'
                },
                pix: this.mapPixDetails(purchase.payment.pix_code, purchase.payment.pix_expiration_date, purchase.payment.pix_qrcode),
                refusalReason: purchase.payment.refusal_reason || 'N/A'
            },
            installments_number: purchase.payment.installments_number,
            method: purchase.payment.type || 'N/A',
            value: purchase.full_price?.value || 0,
            currency: purchase.full_price?.currency_value || 'N/A'
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
            recurrency: {
                number: subscription.recurrencyNumber || 0,
                nextCharge: this.convertToIsoString(subscription.dateNextCharge)
            },
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