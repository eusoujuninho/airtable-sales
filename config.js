require('dotenv').config();
const Airtable = require("airtable");
const mySecret = process.env.AIRTABLE_API_KEY;

exports.base = new Airtable({ apiKey: mySecret }).base("appUv672Y6MZzJqtU");
