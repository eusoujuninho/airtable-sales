const { createRecord } = require("../airtableUtils");
const { base } = require("../config");

// Função assíncrona para encontrar ou criar um registro baseado no código de oferta
async function findOrCreateRecord(tableName, columnName, value, fields) {
  let record = await findUniqueValueInTable(tableName, columnName, value);
  console.log(record);

  if (!record) {
    record = await createRecord(tableName, fields);
  }

  return record;
}

// Função assíncrona para encontrar um valor único em uma tabela
async function findUniqueValueInTable(tableName, columnName, value) {
  try {
    const records = await base(tableName)
      .select({
        filterByFormula: `{${columnName}} = "${value}"`,
        maxRecords: 1,
        view: "Grid view",
      })
      .firstPage();

    if (records.length > 0) {
      console.log("Retrieved", records[0].get(columnName));
      return records[0];
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = {
  findUniqueValueInTable,
  findOrCreateRecord
};
