const fs = require('fs').promises;
const path = require('path');

async function readJsonFile(filePath) {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
}

module.exports = { readJsonFile };
