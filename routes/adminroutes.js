const express = require('express');
const route = express.Router();
const admincontroller = require ('../controller/admincontroller');
const multer = require('multer')



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


route.get('/', admincontroller.admingetlogin);
route.post('/', admincontroller.adminpostlogin);



// ----------inscription------------

route.get('/dashboard', admincontroller.getdashboard); 
route.get('/inscription', admincontroller.getinscription);
route.get('/dashboard/delete', admincontroller.deletedashboard)  
route.get('/dashboard/edit', admincontroller.editgetdashboard)
route.post('/dashboard/edit', admincontroller.editpostdashboard)
route.post('/inscription', admincontroller.postinscription)


//   -------------activites---------------------
route.get('/activites', admincontroller.getactivites);
route.get('/addactivites', admincontroller.getaddactivites)
route.get('/activites/delete', admincontroller.deleteactivites)  
route.get('/activites/edit', admincontroller.editgetactivites)
route.post('/activites/edit',upload.single('image'), admincontroller.editpostactivites)
route.post('/addactivites', upload.single('image'), admincontroller.postaddactivites)
  

//   --------------lieux-------------
  
route.get('/lieux', admincontroller.getlieux);
route.get('/addlieux', admincontroller.getaddlieux)
route.get('/lieux/delete', admincontroller.deletelieux)
route.get('/lieux/edit', admincontroller.editgetlieux)
route.post('/lieux/edit',upload.single('image'), admincontroller.editpostlieux)
route.post('/addlieux', upload.single('image'), admincontroller.postaddlieux)





module.exports= route;