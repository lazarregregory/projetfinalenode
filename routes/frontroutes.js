const express = require('express');
const route = express.Router();
const frontcontroller = require ('../controller/frontcontroller')


route.get('/', frontcontroller.homepage);
route.get('/lieux/montagnes', frontcontroller.lmontagnes)  
route.get('/lieux/plages', frontcontroller.lplages)  
route.get('/lieux/rivieres', frontcontroller.lrivieres)  
route.get('/lieux/descriptif', frontcontroller.ldescriptif)
route.get('/activites/descriptif', frontcontroller.adescriptif)

  module.exports= route;