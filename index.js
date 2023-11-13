const express = require('express');
const app = express();
const port = 3567;
const apiFunctions = require('./functions/core');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucket = storage.bucket('stores-crece');
const ejs = require('ejs'); 
require('dotenv').config();
const serverless = require('serverless-http');


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    const domain =  'pollerialaguapa.creceidea.com'//req.hostname;
    const typeService = await apiFunctions.getTypeService(domain);
    const bucketName = apiFunctions.getBucketName(typeService);
    const themeSelect = await apiFunctions.getThemeSelect(domain);

    const fileName = `${bucketName}/${themeSelect}/index.ejs`; 

console.log('que pasa');

    try {
        const [file] = await bucket.file(fileName).download();

        if (file) {
            const fileContents = file.toString('utf-8');
            const renderedTemplate = ejs.render(fileContents, { message: 'Servicio: '+typeService+' | theme: '+themeSelect+' | Dominio: '+domain });
            res.send(renderedTemplate);
        } else {
            res.status(404).send('El archivo no se encontró en el almacenamiento de Google Cloud.');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Ocurrió un error al cargar y renderizar el archivo.');
    }
});

/*app.listen(port, () => {
    console.log(`La aplicación SSR está funcionando en http://localhost:${port}`);
});*/

module.exports.handler = serverless(app);
