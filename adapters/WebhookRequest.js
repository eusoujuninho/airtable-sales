class WebhookRequest {
    constructor() {
        this.event = {};
        this.createdAt = '';
        this.marketplace = '';
        this.product = {};
        this.affiliates = [];
        this.buyer = {};
        this.producer = {};
        this.commissions = [];
        this.purchase = {};
        this.subscription = {};
    }

    // Métodos para definir as propriedades
    setEvent(name, id) {
        this.event = { name, id };
    }

    setCreatedAt(createdAt) {
        this.createdAt = createdAt;
    }

    setMarketplace(marketplace) {
        this.marketplace = marketplace;
    }

    setProduct(details) {
        this.product = details;
    }

    addAffiliate(detail) {
        this.affiliates.push(detail);
    }

    setBuyer(buyer) {
        this.buyer = buyer;
    }

    setProducer(producer) {
        this.producer = producer;
    }

    addCommission(detail) {
        this.commissions.push(detail);
    }

    setPurchase(purchase) {
        this.purchase = purchase;
    }

    setSubscription(subscription) {
        this.subscription = subscription;
    }

    // Adicione mais setters conforme necessário

    // Getters
    getEvent() {
        return this.event;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    getMarketplace() {
        return this.marketplace;
    }

    getProduct() {
        return this.product;
    }

    getAffiliates() {
        return this.affiliates;
    }

    getBuyer() {
        return this.buyer;
    }

    getProducer() {
        return this.producer;
    }

    getCommissions() {
        return this.commissions;
    }

    getPurchase() {
        return this.purchase;
    }

    getSubscription() {
        return this.subscription;
    }
}

module.exports = {
    WebhookRequest
};