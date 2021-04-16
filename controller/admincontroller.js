const admin = require('../models/adminmodels')



/*-------------LOGIN-----------------*/

exports.admingetlogin =  (req, res, next) => {
    res.render('admin/indexad')
}
exports.adminpostlogin = async (req, res) => {
   admin.postlogin(req, res)
  
}



/*---------------------ADMIN AND INSCRIPTION--------------------------*/

exports.getdashboard = (req, res, next) => {
    admin.dashboard(req, res)
}
exports.getinscription = (req, res, next) => {
    res.render('admin/inscription', {ad:{}});
}
exports.deletedashboard = (req, res, next) => {
  admin.dashboarddel(req, res)
}
exports.editgetdashboard = (req, res, next) => {
    admin.egdashboard(req, res)
}
exports.editpostdashboard = (req, res, next) => {
    admin.epdashboard(req, res)
}
exports.postinscription = (req, res) => {
    admin.pinscription(req, res)
  
  
}


/*-----------------------ACTIVITES-------------------*/

exports.getactivites = (req, res, next) => {
  admin.gactivites(req, res)
}
exports.getaddactivites = (req, res, next) => {
    res.render('admin/Lesactivites/addactivites', { activites: {} }) 
}
exports.deleteactivites = (req, res, next) => {
    admin.deleteact(req, res)
}
exports.editgetactivites = (req, res, next) => {
    admin.egactivites(req, res)
}
exports.editpostactivites = (req, res, next) => {
    admin.epactivites(req, res)
}
exports.postaddactivites = (req, res) => {
   admin.paddactivites(req, res)
}

/*-----------------------LIEUX--------------------*/

exports.getlieux = (req, res, next) => {
    admin.glieux(req, res)
}
exports.getaddlieux = (req, res, next) => {
    res.render('admin/Leslieux/addlieux', { lieux: {} })
}
exports.deletelieux = (req, res, next) => {
    admin.lieuxdelete(req, res)
}
exports.editgetlieux = (req, res, next) => {
    admin.eglieux(req, res)
}
exports.editpostlieux = (req, res, next) => {
    admin.eplieux(req, res)
}
exports.postaddlieux = (req, res) => {
    admin.paddlieux(req, res)
}