var express = require('express');
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const Question = require('../models/questions');


/* POST a question. */                      //-----------------------------> WORKING
router.post('/', function(req, res, next) {
  // const questions = req.app.locals.questions;
  const document = req.body;
  if (!req.body.title || !req.body.description) {
    return res.status(400).send({
      message: "Required field can not be empty",
    });
  }
  
  let newQuestion = new Question({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    userID: req.body.userID,
    categoryID: req.body.categoryID,
    activeUser: req.body.activeUser
  });

  newQuestion.save();
  res.status(202);
    

});

  

// /* GET all questions page. */       -----------------------------> WORKING
router.get('/', async (req, res, next) => {
  // const questions = req.app.locals.questions;
  // questions.find({})
  //   .toArray()  
  //   .then(data => res.json(data));
  // Question.find({}).toArray().then(data => res.json(data));
  // return Question.find({});
//   Question.find(function(err, data) {
//     if(err){
//         console.log(err);
//     }
//     else{
//         res.send(data);
//     }
// });  
  // await Question.find({"_id":id});
  Question.find({})
        .then(data => res.json(data));

});

// /* GET a single question with specified id. */      -----------------------------> WORKING
router.get('/:id', function(req, res, next) {
  // const questions = req.app.locals.questions;
  const id = ObjectID(req.params.id);
  // questions.findOne({_id: id})
  //       .then(data => res.json(data));
  // Question.findOne({_id:id}, 
    Question.find({_id:id})
        .then(data => res.json(data));

});

  
// /* UPDATE a question with specified id. */              // ---------->  WORKING
router.patch('/:id', async (req, res, next) => {
  var updateObject = req.body; // {last_name : "smith", age: 44}
  const id = ObjectID(req.params.id);
  // Question.updateOne({_id  : id}, {$set: updateObject});
  // await Question.updateOne({_id  : id}, { $set: {image: "Mickey"} }).then(data => res.json(data));
  // Question.updateOne({_id  : id}, { $set: {image: "Mickey"} });
  await Question.findByIdAndUpdate(req.params.id, req.body);

  res.send(updateObject);
});


//   /* REPLACE a question with specified id. */ -----------------------------> WORKING
  router.put('/:id/', async (req, res, next) => {
    // const questions = req.app.locals.questions;
    // const id = ObjectID(req.params.id);
    // const newDocument = req.body;
  
    // let updatedQuestion = new Question({
    //   title: req.body.title,
    //   description: req.body.description,
    //   image: req.body.image,
    //   userID: req.body.userID,
    //   categoryID: req.body.categoryID,
    //   activeUser: req.body.activeUser
    // });

    // questions
    //   .replaceOne({_id: id}, updatedQuestion)
    //   .then(data => res.json(data));
    // const { error } = validateProduct(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);

    const currQuestion = await Question.findById(req.params.id).exec();
    if (!currQuestion) return res.status(404).send('The question with the given ID was not found.');

    let query = {$set: {}};
    for (let key in req.body) {
      if (currQuestion[key] && currQuestion[key] !== req.body[key]) // if the field we have in req.body exists, we're gonna update it
        query.$set[key] = req.body[key];
    }

    const updatedQuestion = await Question.updateOne({_id: req.params.id}, query).exec();
    

    res.send(updatedQuestion);
  });


  
// /* DELETE a question with specified id. */
router.delete('/:id', async (req, res, next) => {
    // const questions = req.app.locals.questions;
    // const id = ObjectID(req.params.id);
  
    // questions
    //   .deleteOne({_id: id})
    //   .then(data => res.json(data));
    const deletedQuestion = await Question.deleteOne({_id: req.params.id}).exec();
    res.send(deletedQuestion);
  });


// /* DELETE a question with specified title. */            // ---------->  NOT WORKING
// router.delete('/byName/', async (req, res, next) => {
//   // const questions = req.app.locals.questions;
//   // const id = ObjectID(req.params.id);

//   // questions
//   //   .deleteOne({_id: id})
//   //   .then(data => res.json(data));
//   console.log("curr title is ");
//   console.log(req.body.title);
  
//   const deletedQuestion = await Question.deleteOne({title: req.body.title});
//   // const deletedQuestion = await Question.findOneAndDelete({title: req.body.title});
//   res.send(deletedQuestion);
// });

  
  
module.exports = router;
