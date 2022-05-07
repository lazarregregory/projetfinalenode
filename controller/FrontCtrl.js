const { json } = require('body-parser');
const fetch = require('node-fetch');



exports.getHomePage = async (req, res) => {

    const response = await fetch('http://localhost:8080/api/admin/allactivites');
    const myAllActivites = await response.json();
    console.log('ici-------:', myAllActivites);

    res.render('index',{allActivites : myAllActivites})
}
exports.lieuxMontagnes = async (req, res) => {

    const response = await fetch('http://localhost:8080/api/admin/alllieuxMontagnes');
    const myAllMontagnes = await response.json();
    console.log('ici-------:', myAllMontagnes);

    
    res.render('pages/lieux',{allMontagnes : myAllMontagnes})
    
}
exports.lieuxPlages = async (req, res) => {

    const response = await fetch('http://localhost:8080/api/admin/alllieuxPlages');
    const myAllPlages = await response.json();
    console.log('ici-------:', myAllPlages);

    
    res.render('pages/lieux',{allPlages : myAllPlages})
    
}
exports.lieuxRivieres = async (req, res) => {

    const response = await fetch('http://localhost:8080/api/admin/alllieuxRivieres');
    const myAllRivieres = await response.json();
    console.log('ici-------:', myAllRivieres);

    
    res.render('pages/lieux',{allRivieres : myAllRivieres})
    
}
exports.getDescriptifLieux = async (req, res) => {

    const response = await fetch('http://localhost:8080/api/admin/onelieux/?id='+ req.query.id);
    const myOne = await response.json();
    console.log('ici-------:', myOne);

    
    res.render('pages/descriptifLieux',{myOne : myOne})
    
}
exports.getDescriptifActivites = async (req, res) => {

    const response = await fetch('http://localhost:8080/api/admin/allactivites/?id='+ req.query.id);
    const myOne = await response.json();
    console.log('ici-------:', myOne);

    
    res.render('pages/descriptifActivites',{myOne : myOne})
    
}
