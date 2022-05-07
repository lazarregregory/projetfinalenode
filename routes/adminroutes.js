const express = require('express');
const route = express.Router();
const multer = require('multer');
const adminCtrl = require('../controller/adminCtrl');




var storage = multer.diskStorage({
  destination: function (req, file, callback) {
  callback(null, 'public/img/');
  },
  filename: function (req, file, callback) {
  callback(null, file.originalname);
  }
  })
  var upload = multer({ storage: storage });

/*---------- connection --------*/


route.get('/', adminCtrl.getLoginPage);
route.post('/login', adminCtrl.adminLogin);
route.get('/logout', adminCtrl.adminlogout);



// ----------inscription------------

route.get('/dashboard',adminCtrl.adminApiVerify,adminCtrl.viewAdminProfil); 
route.get('/inscription',adminCtrl.adminApiVerify,adminCtrl.getinscription);

route.get('/dashboard/update', adminCtrl.getUpdateFormAdmin)
route.post('/dashboard/postupdate',adminCtrl.adminApiVerify, adminCtrl.updateAdmin)
route.post('/postinscription', adminCtrl.register)

route.get('/dashboard/delete',adminCtrl.adminApiVerify, adminCtrl.deleteAdmin)  
route.delete('/dashboard/delete',adminCtrl.adminApiVerify, adminCtrl.deleteAdmin)  

//   -------------activites---------------------
route.get('/activites',adminCtrl.adminApiVerify, adminCtrl.viewAdminActivites);
route.get('/addActivites',adminCtrl.adminApiVerify, adminCtrl.getAddActivites);
route.post('/postaddactivites',adminCtrl.adminApiVerify,upload.single('Image'),adminCtrl.addActivites)

// update activites
route.post('/activites/postupdate',upload.single('Image'),adminCtrl.updateActivites)
route.get('/activites/update',adminCtrl.adminApiVerify, adminCtrl.getUpdateFormActivites);
//delete activite
route.delete('/activites/delete',adminCtrl.adminApiVerify, adminCtrl.deleteActivites);  
route.get('/activites/delete',adminCtrl.adminApiVerify, adminCtrl.deleteActivites);  


//   --------------lieux-------------
  
route.get('/lieux',adminCtrl.adminApiVerify, adminCtrl.viewAdminLieux);
route.get('/addlieux',adminCtrl.adminApiVerify, adminCtrl.getAddLieux);

route.get('/lieux/update',adminCtrl.adminApiVerify, adminCtrl.getUpdateFormLieux)
route.post('/lieux/postUpdate',adminCtrl.adminApiVerify, adminCtrl.updateLieux)
route.post('/postaddlieux',adminCtrl.adminApiVerify,upload.single("Image"), adminCtrl.addLieux)

route.get('/lieux/delete',adminCtrl.adminApiVerify, adminCtrl.deleteLieux);
route.delete('/lieux/delete',adminCtrl.adminApiVerify, adminCtrl.deleteLieux);




module.exports= route;