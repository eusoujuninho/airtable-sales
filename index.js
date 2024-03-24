const fs = require('fs').promises;
const path = require('path');
const { base } = require("./config");
const { HotmartWebhookAdapter } = require("./webhooks/hotmart.js");
const { DoppusWebhookAdapter } = require("./webhooks/doppus.js"); 
const { readJsonFile } = require('./utils.js');

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

    console.log(adaptedData);
}

async function main() {
    const exampleData = await readJsonFile(path.join(__dirname, 'example.json'));
    await handleWebhook(exampleData);
}

main().catch(console.error);
