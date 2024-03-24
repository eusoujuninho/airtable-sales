const { base } = require('../config');

class AirtableBase {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async find(id) {
    try {
      const record = await base(this.tableName).find(id);
      return record ? record.fields : null;
    } catch (error) {
      console.error('Error finding record:', error);
      return null;
    }
  }

  async findBy(columnName, value) {
    try {
      const records = await base(this.tableName).select({
        filterByFormula: `{${columnName}} = "${value}"`,
        maxRecords: 1,
        view: "Grid view",
      }).firstPage();
      return records.length > 0 ? records[0].fields : null;
    } catch (error) {
      console.error('Error finding record by column:', error);
      return null;
    }
  }

  // Exemplo de método findById no modelo Marketplace
async findById(id) {
  const record = await this.find(id);
  if (record) {
    this.fill(record);
    return this;
  } else {
    return null;
  }
}


  async create(fields) {
    try {
      const record = await base(this.tableName).create(fields);
      return record.fields;
    } catch (error) {
      console.error('Error creating record:', error);
      return null;
    }
  }

  async update(id, fields) {
    try {
      const record = await base(this.tableName).update(id, fields);
      return record.fields;
    } catch (error) {
      console.error('Error updating record:', error);
      return null;
    }
  }
}

module.exports = AirtableBase;
