const { json } = require('body-parser');
const fetch = require('node-fetch');
const LocalStorage = require('node-localstorage').LocalStorage;

var localStorage = new LocalStorage('./scratch');

// API Verify
exports.adminApiVerify = async (req, res, next) => {

    const response = await fetch("http://localhost:8080/api/admin/verify", {

        headers: {
            'authorization': localStorage.getItem('token')
        }
    })
    const myJson1 = await response.json();
    console.log('myJson admin', myJson1)
    req.admin = myJson1
    return next()

}
exports.getLoginPage = async (req, res) => {
    res.render('../views/admin/indexad')
},
    exports.adminLogin = async (req, res) => {

        // POST request using fetch()
        await fetch("http://localhost:8080/api/admin/login", {

            method: "POST",

            body: JSON.stringify({
                email: req.body.email,
                mdp: req.body.mdp,
            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            // Converting to JSON
            .then(response => response.json())

            // Displaying results to console
            .then(json => {

                localStorage.setItem('token', json.token);

            })

        res.redirect('/admin/dashboard')
    },
    exports.adminlogout = async (req, res) => {
        var getoken = localStorage.getItem('token');
        console.log('token à supp', getoken);
        if (getoken) {
            localStorage.removeItem('token');
            res.redirect('/')
        } else {
            res.redirect('/')
        }
    },
    exports.getinscription = async (req, res) => {
        if (req.admin.idadmin) {
            res.render('../views/admin/inscription')
        } else {
            res.redirect('/')
        }
    },
    exports.register = async (req, res) => {
        // POST request using fetch()
        fetch("http://localhost:8080/api/admin/register", {

            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify({
                email: req.body.email,
                Nom: req.body.nom,
                Prenom: req.body.prenom,
                mdp: req.body.mdp,

            }),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            // Converting to JSON
            .then(response => response.json())

            // Displaying results to console
            .then(json => console.log(json))

        res.redirect('/admin')


    },

    // Admin
    exports.viewAdminProfil = async (req, res) => {
        if (req.admin.idadmin) {
            const response = await fetch('http://localhost:8080/api/admin/AllAdmin');
            const myAllAdmin = await response.json();


            return res.render('admin/Dashboard', { myAllAdmin: myAllAdmin, admin: req.admin });
        } else {
            res.redirect('/')
        }
    },
    exports.deleteAdmin = async (req, res) => {


        const response = await fetch("http://localhost:8080/api/admin/delete?idadmin=" + req.query.idadmin, {

            method: "DELETE",

        });
        const myJson = await response.json()
        console.log("---------------", myJson)

            res.redirect('/admin/dashboard')
    },
    exports.updateAdmin = async (req, res) => {

        // POST request using fetch()
        await fetch("http://localhost:8080/api/admin/upAdmin", {

            method: "PUT",

            body: JSON.stringify({
                email: req.body.email,
                Nom: req.body.nom,
                Prenom: req.body.prenom,
                mdp: req.body.mdp

            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            // Converting to JSON
            .then(response => response.json())

            // Displaying results to console
            .then(json =>
                console.log(json))

        res.redirect('/admin/dashboard')
    },
    exports.getUpdateFormAdmin = async (req, res) => {
        res.render('../views/admin/upinscription')
    },
    //activites
    exports.viewAdminActivites = async (req, res) => {
        if (req.admin.idadmin) {
            const response = await fetch('http://localhost:8080/api/admin/allactivites');
            const myAllActivites = await response.json();

            res.render('admin/Lesactivites/Activites', { allActivites: myAllActivites });
        } else {
            res.redirect('/')
        }
    },
    exports.getAddActivites = async (req, res) => {
        if (req.admin.idadmin) {
            res.render('../views/admin/Lesactivites/addactivites', { admin: req.admin })
        } else {
            res.redirect('/')
        }
    },
    exports.addActivites = async (req, res) => {

        // POST request using fetch()
        await fetch("http://localhost:8080/api/admin/addactivites", {

            method: "POST",

            body: JSON.stringify({
                Titre: req.body.titre,
                Description: req.body.description,
                Image: req.file.originalname,
                idadmin: req.admin.idadmin
            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }

        })

            // Converting to JSON
            .then(response => response.json())

            // Displaying results to console
            .then(json =>
                console.log(json))

        res.redirect('/admin/activites')
    },
    exports.deleteActivites = async (req, res) => {

        const response = await fetch("http://localhost:8080/api/admin/delete/activites?idactivites=" + req.query.idactivites, {
            method: "DELETE",

        });
        const myJson = await response.json()
        res.redirect('/admin/activites')
    },
    exports.updateActivites = async (req, res) => {

        // POST request using fetch()
        await fetch("http://localhost:8080/api/admin/upactivites?id="+ req.query.idactivites, {

            method: "PUT",

            body: JSON.stringify({
                Titre: req.body.titre,
                Description: req.body.description,
                Image: req.body.image,
            

            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            // Converting to JSON
            .then(response => response.json())

            // Displaying results to console
            .then(json =>
                console.log(json))

        res.redirect('/admin/activites')
    },
    exports.getUpdateFormActivites = async (req, res) => {  
        
        if (req.admin.idadmin) {
        const response = await fetch('http://localhost:8080/api/admin/oneactivites?idactivites='+req.query.idactivites)
        const myJson = await response.json()
        console.log('ICI ',myJson)

        res.render('../views/admin/Lesactivites/upaddactivites', { updateAct : myJson });
    } else {
        res.redirect('/')
    }
},

    //lieux

    exports.viewAdminLieux = async (req, res) => {
        if (req.admin.idadmin) {
            const response = await fetch('http://localhost:8080/api/admin/alllieux');
            const myAllLieux = await response.json();


            res.render('admin/Leslieux/Lieux', { allLieux: myAllLieux });
        } else {
            res.redirect('/')
        }


    },
    exports.getAddLieux = async (req, res) => {

        if (req.admin.idadmin) {
            res.render('../views/admin/Leslieux/addlieux', { admin: req.admin })
        } else {
            res.redirect('/')
        }
    },
    exports.addLieux = async (req, res) => {

        // POST request using fetch()
        await fetch("http://localhost:8080/api/admin/addlieux", {

            method: "POST",

            body: JSON.stringify({
                idcategorie: req.body.categorie,
                Titre: req.body.titre,
                Description: req.body.description,
                Image: req.file.originalname,
                idadmin: req.admin.idadmin
            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            // Converting to JSON
            .then(response => response.json())

            // Displaying results to console
            .then(json =>
                console.log(json))

        res.redirect('/admin/Lieux')
    },
    exports.deleteLieux = async (req, res) => {
        
            const response = await fetch("http://localhost:8080/api/admin/delete/lieux?idLieux=" + req.query.idLieux, {

                method: "DELETE",
    
            });
            const myJson = await response.json()
            console.log("---------------", myJson)

        res.redirect('/admin/lieux')
    },
    exports.updateLieux = async (req, res) => {

        // POST request using fetch()
        await fetch("http://localhost:8080/api/admin/uplieux", {

            method: "PUT",

            body: JSON.stringify({
                idcategorie: req.body.categorie,
                Titre: req.body.titre,
                Description: req.body.description,
                Image: req.file.originalname,

            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            // Converting to JSON
            .then(response => response.json())

            // Displaying results to console
            .then(json =>
                console.log(json))

        res.redirect('/admin/lieux')
    },
    exports.getUpdateFormLieux = async (req, res) => {
        res.render('../views/admin/Leslieux/upaddlieux')
    }
