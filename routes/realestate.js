const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const Realestate = require('../models/Realestate.js');


// get all realestates
router.get('/', (req, res, next) => {
  Realestate.find((err, realestates) => {
    if (err) return next(err);
    res.json(realestates);
  });
});

// get a realestate by id
router.get('/:id', (req, res, next) => {
  Realestate.findById(req.params.id, (err, realestate) => {
    if (err) return next(err);
    res.json(realestate);
  });
});

// create a realestate
router.post('/', (req, res, next) => {
  Realestate.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

// update a realestate by id
router.put('/:id', (req, res, next) => {
  Realestate.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

// delete a realestate by id
router.delete('/:id', (req, res, next) => {
  Realestate.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

// upload images
router.post('/images', (req, res, next) => {
  const form = new formidable.IncomingForm();

  const filenamesSaved = [];
  let filenameSeed = Date.now();

  form.parse(req);

  form.on('fileBegin', (name, file) => {
    const filenameToSave = `${filenameSeed++}.${getFilenameExtension(file.name)}`;
    filenamesSaved.push(filenameToSave);
    file.path = `${__dirname}/../images/${filenameToSave}`;
  });

  form.on('end', (name, file) => {
    res.json(filenamesSaved);
  });
});

module.exports = router;

function getFilenameExtension(filename) {
  return filename.split('.').pop();
}
