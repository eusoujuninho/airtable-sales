require('dotenv').config(); // Adicione esta linha se estiver usando variáveis de ambiente do arquivo .env
const Airtable = require("airtable");

// Assegure-se de que suas variáveis de ambiente estejam definidas corretamente
const mySecret = process.env.AIRTABLE_API_KEY;
const airtableDatabase = process.env.AIRTABLE_API_DATABASE;

exports.base = new Airtable({ apiKey: mySecret }).base(airtableDatabase);
