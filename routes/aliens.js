const express = require('express')
const router = express.Router()
const Alien = require('../models/alien')
const controller = require('../controllers/alien')
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime-types');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
     filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)

            cb(null, raw.toString('hex') + "." + mime.extension(file.mimetype))
        })
    }
  })
   
  var upload = multer({ storage: storage })

router.get('/', async(req,res) => {
    try{
           const aliens = await Alien.find()
           res.json(aliens)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:id', async(req,res) => {
    try{
           const alien = await Alien.findById(req.params.id)
           res.json(alien)
    }catch(err){
        res.send('Error ' + err)
    }
})


router.post('/',upload.single('image'), controller.addAlien)

router.patch('/:id',async(req,res)=> {
    try{
        const alien = await Alien.findById(req.params.id) 
        alien.sub = req.body.sub
        const a1 = await alien.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})

module.exports = router