var express = require('express');
var multer = require('multer');
var router = express.Router();
const Picture = require('../models/picture');
const upload = multer({ dest: './public/uploads/' });

/* GET home page. */
router.get('/', (req, res, next) => {
  Picture.find({}, (err, pictures) => {
    if (err) {
      return next(err);
    }
    const data = {
      pictures: pictures
    };
    res.render('index', data);
  });
});

// Route to upload from project base path

router
  .post('/upload', upload.single('photo'), function (req, res, next) {
    const pic = new Picture({
      name: req.body.name,
      path: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname
    });

    pic.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });

module.exports = router;
