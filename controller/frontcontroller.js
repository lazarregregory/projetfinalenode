
const front = require('../models/frontmodels')



exports.homepage = (req, res) => {
    front.hp(req, res)
}
exports.lmontagnes = (req, res) => {
    front.montagnes(req, res)
}
exports.lplages = (req, res) => {
    front.plages(req, res)
}
exports.lrivieres = (req, res) => {
    front.rivieres(req, res)
}
exports.ldescriptif = (req, res) => {
    front.lieuxdescript(req, res)
}
exports.adescriptif = (req, res) => {
    front.activitesdescript(req, res)
}