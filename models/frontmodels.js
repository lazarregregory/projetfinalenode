const connection = require('../config/databConnect');




class front {

    static hp(req, res) {
        let ac = 'SELECT * FROM activites GROUP BY Titre';
    connection.query( ac, (err, result) => {
      if(err) throw err;
      res.render('index', { activites : result })
    })
        
    }
    static montagnes(req, res) {
        let sqlQuery = 'SELECT * FROM lieux l , categorie c WHERE c.idcategorie = l.idcategorie AND nomcategorie = "montagnes"'
    connection.query(sqlQuery, (err, result) => {
      if(err) throw err;
      console.log("-----------", result)
      res.render('pages/lieux', { lieuxm: result })
    });
    }
    static plages(req, res) {
        let sqlQuery = 'SELECT * FROM lieux l , categorie c WHERE c.idcategorie = l.idcategorie AND nomcategorie = "plages"'
    connection.query(sqlQuery, (err, result) => {
      if(err) throw err;
      res.render('pages/lieux', { lieuxp: result })
    });
    }
    static rivieres(req, res) {
        let sqlQuery = 'SELECT * FROM lieux l , categorie c WHERE c.idcategorie = l.idcategorie AND nomcategorie = "rivieres"'
    connection.query(sqlQuery, (err, result) => {
      if(err) throw err;
      res.render('pages/lieux', { lieuxr: result })
    });
    }
    static lieuxdescript(req, res) {
        let des = 'SELECT * FROM lieux WHERE idLieux= ?';
    connection.query(des, req.query.idLieux, (err,result) => {
      res.render('pages/descriptif', { lieux : result[0] })
      
    })
    }
    static activitesdescript(req, res) {
        let act = 'SELECT * FROM activites WHERE idactivites = ?';
    connection.query(act, req.query.idactivites, (err, result) => {
      res.render('pages/descriptif', { activites : result[0] } )
    })
    }
   
}

module.exports = front