const express = require('express');
const route = express.Router();
const frontcontroller = require ('../controller/FrontCtrl')


route.get('/', frontcontroller.getHomePage);
route.get('/lieux/montagnes', frontcontroller.lieuxMontagnes)  
route.get('/lieux/plages', frontcontroller.lieuxPlages)  
route.get('/lieux/rivieres', frontcontroller.lieuxRivieres) 

route.get('/lieux/descriptif', frontcontroller.getDescriptifLieux)
route.get('/activites/descriptif', frontcontroller.getDescriptifActivites)


  module.exports= route;