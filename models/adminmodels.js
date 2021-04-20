const connection = require('../config/databConnect');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


class admin {

// ----------------LOGIN--------------

    static postlogin(req, res) {
        try {
            const { email, mdp } = req.body;
        
        
            if( !email || !mdp ) {
              return res.status(400).render('admin/indexad', {
                message: 'Veuillez remplir les 2 champs'
              })
            }
        
            connection.query('SELECT * FROM administrateurs WHERE email = ?', [email], async (err, result) => {
                console.log('=================', result);
                if( !result || !(await bcrypt.compare(mdp, result[0].mdp))) {
                  return res.status(401).render('admin/indexad', {
                    message: 'Email ou Mot de passe incorrect', 
                  })
                } else {
                  const id = result[0].id;
                 
                  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                  });
        
                  console.log("le token est:" + token);
        
                  const cookieOptions = {
                    expires: new Date(
                      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                  }
        
                  res.cookie('jwt', token, cookieOptions);
                  res.status(200).redirect("/admin/dashboard");
                }
        
            })
          } catch (err) {
            console.log(err);
          }
    }

// ---------------INSCRIPTION--------------

    static dashboard(req, res) {
        let sqlQuery = 'SELECT * FROM administrateurs';
        connection.query(sqlQuery, (err, result) => {
          if(err) throw err;
          res.render('admin/Dashboard', { ad: result })
      });
    }
    static dashboarddel(req, res) {
        let deleteq = 'DELETE FROM administrateurs WHERE idadmin = ?';
        connection.query(deleteq, req.query.idadmin, (err, result) => {
            return res.redirect('/admin/dashboard');
     })
    }
    static egdashboard(req, res) {
        let edite = 'SELECT * FROM administrateurs WHERE idadmin = ?';
    connection.query(edite, req.query.idadmin, (err, result) => {
        return res.render('admin/inscription', { ad: result[0] } )
    })
    }
    static epdashboard(req, res) {
        let data = {
            Nom : req.body.nom, 
            Prenom :req.body.prenom, 
            email : req.body.email 
          };  
          console.log('---------data-------', data)
          let para = [
                data,
                req.query.idadmin,
            ];
            console.log('----------para----', para)
            let upda= 'UPDATE administrateurs SET ? WHERE idadmin = ?';
            connection.query( upda, para, (err, result) => {
              console.log('----------', result)
                res.redirect('/admin/dashboard');
                
                
            })
    }
    static pinscription(req, res) {
        let data = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            mdp: req.body.mdp,
            confirmmdp: req.body.confirmmdp 
          }
          console.log(data)
        
          connection.query('SELECT email FROM administrateurs WHERE email = ?', data.email, async (err, result) => {
            if(err) {
              console.log(err);
            }
        
            if( result.length > 0) {
              return res.render('admin/inscription', {
                ermessage: 'Email deja utiliser', ad:{}
              })
            } else if( data.mdp !== data.confirmmdp ) {
              return res.render('admin/inscription', {
                ermessage: 'les mots de passe ne correspondent pas', ad: {}
              });
            }
        
            let cryptmdp = await bcrypt.hash(data.mdp, 8);
            console.log(cryptmdp);
        
            connection.query('INSERT INTO administrateurs SET ?', {nom: data.nom, prenom: data.prenom, email: data.email, mdp: cryptmdp }, (err, result) => {
              if(err) {
                console.log(err);
              } else {
                console.log(result)
                return res.render('admin/inscription', {
                  rmessage: 'admin enregistrer', ad : {}
                });
        
              }
            })
          });
    }

// -------------------ACTIVITES---------------


    static gactivites(req, res) {
        let sqlQuery = 'SELECT * FROM activites';
        connection.query(sqlQuery, (err, result) => {
          if(err) throw err;
          res.render('admin/Lesactivites/Activites', {activites: result})
    });
    }
    static deleteact(req, res) {
        let deleteq = 'DELETE FROM activites WHERE idactivites = ?';
    connection.query(deleteq, req.query.idactivites, (err, result) => {
        return res.redirect('/admin/activites');
 })
    }
    static egactivites(req, res) {
        let edit = 'SELECT * FROM activites WHERE idactivites = ?';
    connection.query(edit, req.query.idactivites, (err, result) => {
        return res.render('admin/Lesactivites/addactivites', { activites: result[0] })
    })
    }
    static epactivites(req, res) {
        let params = {
          image : req.file.originalname,
          titre : req.body.titre,
          description : req.body.description,
        }
        let id = req.query.idactivites
        console.log("--------eeee----------", id)
        let up= 'UPDATE activites SET ? WHERE idactivites = ?';
        connection.query( up, [params,id], (err, result) => {
            res.redirect('/admin/activites');
            
            
        })
    }
    static paddactivites(req, res) {
        let data = {
            titre: req.body.titre,
            image: req.file.originalname,
            description: req.body.description
        }
        if(data.titre && data.image && data.description) {
      
            let sqlQuery = 'INSERT INTO activites SET ?';
      
            connection.query(sqlQuery, data, (err, result) => {
                if(err) throw err;
                res.render('admin/Lesactivites/addactivites',{ message: 'Votre activités a bien été ajouter', activites: {} })
            });
        } else {
            res.render('admin/Lesactivites/addactivites', { errmessage: 'Vous devez remplir tout les champs'})
        }
    }

// ------------------------LIEUX-------------------------

    static glieux(req, res) {
        let sqlQuery = 'SELECT * FROM lieux';
    connection.query(sqlQuery, (err, result) => {
      if(err) throw err;
      res.render('admin/Leslieux/Lieux', {lieux: result})
});
    }
    static lieuxdelete(req, res) {
        let deletes = 'DELETE FROM lieux WHERE idLieux = ?';
    connection.query(deletes, req.query.idLieux, (err, result) => {
            return res.redirect('/admin/lieux');
            
        })
    }
    static eglieux(req, res) {
        let edits = 'SELECT * FROM lieux WHERE idLieux = ?';
    connection.query(edits, req.query.idLieux, (err, result) => {
        return res.render('admin/Leslieux/addlieux', { lieux: result[0] 
        })
    })
    }
    static eplieux(req, res) {
        let params = {
          idcategorie: req.body.categorie,
          titre: req.body.titre,
          image: req.file.originalname,
          description: req.body.description

        }
            
        let id = req.query.idLieux;
        let upd= 'UPDATE lieux SET ? WHERE idLieux = ?';
        connection.query( upd, [params,id], (err, result) => {
            res.redirect('/admin/lieux');
            
        })
    }
    static paddlieux(req, res) {
        let data = {
            idcategorie: req.body.categorie,
            titre: req.body.titre,
            image: req.file.originalname,
            description: req.body.description
        }
        if(data.idcategorie && data.titre && data.image && data.description) {
      
            let sqlQuery = 'INSERT INTO lieux SET ?';
      
            connection.query(sqlQuery, data, (err, result) => {
                if(err) throw err;
                res.render('admin/Leslieux/addlieux', { validmessage: 'Votre lieu a bien été ajouter', lieux: {} })
            });
        } else {
            res.render('admin/Leslieux/addlieux', { errormessage: 'Vous devez remplir tout les champs'})
        }
    }
}

module.exports = admin