const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  // INDEX
  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((banana1) => res.json(banana1))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  // SHOW
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .findOne({ _id: ObjectID(id) })
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  // CREATE
  router.post('/', (req, res) => {
   const newData = req.body;
   collection
   .insertOne(newData)
   .then((result) => {
     res.json(result.ops[0]);
   })
   .catch((err) => {
     console.error(err);
     res.status(500);
     res.json({status: 500, error: err});
   })
 });

  // UPDATE
  router.put('/:id', (req, res) => {
   const id = req.params.id;
   const updatedData = req.body;
   collection
   .findOneAndUpdate(
     {_id: ObjectID(id)},
     {$set: updatedData},
     {returnOriginal: false}
   )
   .then((result) => {
     res.json(result.value)
   })
   .catch((err) => {
     console.error(err);
     res.status(500);
     res.json({status: 500, error: err});
   })
 });

  // DELETE
  router.delete('/:id', (req, res) => {
     const id = req.params.id;
     collection
     .deleteOne({ _id: ObjectID(id) })
     .then(result => {
       res.json(result)
     })
     .catch((err) => {
       console.error(err);
       res.status(500);
       res.json({ status: 500, error: err });
     });
   });

  return router;
};

module.exports = createRouter;