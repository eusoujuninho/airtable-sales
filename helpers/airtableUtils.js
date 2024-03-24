const { base } = require("../config");

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function createRecord(tableName, fields) {
  try {
    const record = await base(tableName).create(fields);
    console.log(`Record created with ID: ${record.id}`);
    return record;
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = { generateSlug, createRecord };
