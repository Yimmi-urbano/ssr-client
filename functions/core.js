const axios = require('axios');

async function getTypeService(domain) {
  try {
    const response = await axios.get(`https://ag-companies-014d99127ab1.herokuapp.com/domain/${domain}`);
    return response.data[0].typeService
  } catch (error) {
    console.error(`Error al obtener 'typeCompany' para el dominio ${domain}: ${error.message}`);
    return null;
  }
}

async function getThemeSelect(domain) {
  try {
    const response = await axios.get(`https://ag-companies-014d99127ab1.herokuapp.com/domain/${domain}`);
    return response.data[0].theme
  } catch (error) {
    console.error(`Error al obtener 'typeCompany' para el dominio ${domain}: ${error.message}`);
    return null;
  }
}

function getBucketName(typeService) {
  if (typeService === 'freestore') {
      return 'freestore';
  } else {
      return 'payments';
  }
}


module.exports = {
  getTypeService,
  getBucketName,
  getThemeSelect
};
