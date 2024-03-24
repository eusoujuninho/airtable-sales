async function getModelObject(param, model) {
    if (typeof param === 'object') {
      return param;
    } else if (typeof param === 'string') {
      if (param.startsWith('rec')) {
        const record = await model.find(param);
        if (record) {
          return record;
        } else {
          throw new Error(`Registro não encontrado com ID ${param}.`);
        }
      } else {
        const record = await model.findByColumnParameter(param);
        if (record) {
          return record;
        } else {
          throw new Error(`Registro não encontrado com base no parâmetro ${param}.`);
        }
      }
    } else {
      throw new Error('Tipo de parâmetro inválido.');
    }
  }
  
  module.exports = {
    getModelObject,
  };
  