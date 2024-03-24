const Airtable = require("airtable");
const mySecret = process.env["AIRTABLE_API_KEY"];
const airtableDatabase = process.env["AIRTABLE_API_DATABASE"];

exports.base = new Airtable({ apiKey: mySecret }).base(airtableDatabase);