const axios = require('axios');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucket = storage.bucket('stores-crece');

async function getInfoCompany(domain) {
  try {
    const response = await axios.get(`https://ag-companies-014d99127ab1.herokuapp.com/domain/${domain}`);
    return response.data[0]
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
function getversion() {
  const letrasAleatorias = [...Array(3)].map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)));
  const timestamp = Math.floor(Date.now() / 1000); 

  return letrasAleatorias.join('') + timestamp;
}



module.exports = {
  getInfoCompany,
  getBucketName,
  getversion
};
