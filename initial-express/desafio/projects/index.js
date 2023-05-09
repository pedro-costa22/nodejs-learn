const express = require('express');
const router = express.Router();

const path = require('path');
const basePath = path.join(__dirname, '../templates');

router.get('/', (req, res) => {
    res.sendFile(`${basePath}/projects.html`)
});

router.get('/:id', (req, res) => {
    console.log('acessando o detalhe do projeto')
   
});


module.exports = router;