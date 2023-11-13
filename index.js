const express = require('express');
const app = express();
const port = 3567;
const apiFunctions = require('./functions/core');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucket = storage.bucket('stores-crece');
const ejs = require('ejs'); 
require('dotenv').config();


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    const domain =  req.hostname;
    const _fieldCompany = await apiFunctions.getInfoCompany(domain);
    const typeService = _fieldCompany.typeService;
    const nameCompany= _fieldCompany.nameCompany;
    const infoCompany= _fieldCompany;
    const themeColor= _fieldCompany.appearance['colors'].primary;
    const getversion = apiFunctions.getversion();
    const bucketName = apiFunctions.getBucketName(typeService);
    const themeSelect = _fieldCompany.theme;
    const fileName = `${bucketName}/${themeSelect}/index.ejs`; 

    try {
        const [file] = await bucket.file(fileName).download();

        if (file) {
            const fileContents = file.toString('utf-8');
            const renderedTemplate = ejs.render(fileContents, { nameCompany: nameCompany, themeColor: themeColor, infoCompany:infoCompany, getversion:getversion});
            res.send(renderedTemplate);
        } else {
            res.status(404).send('El archivo no se encontró en el almacenamiento de Google Cloud.');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Ocurrió un error al cargar y renderizar el archivo.');
    }
});




app.listen(port, () => {
    console.log(`La aplicación SSR está funcionando en http://localhost:${port}`);
});
