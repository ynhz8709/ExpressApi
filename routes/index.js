const Joi = require('joi');//new
var express = require('express');
var router = express.Router();

const courses=[
  
  {id:1,name:'Mike',ci:'12345',age:'31'},
  {id:2,name:'Juliet',ci:'12345',age:'31'},
  {id:3,name:'Tomaaa',ci:'12345',age:'31'}
];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/courses', function(req, res) {
  res.send(courses);
});

router.get('/api/courses/:id', function(req, res) { 
  const course = courses.find(c=> c.id === parseInt(req.params.id) );
  if(!course) return res.status(404).send('The course with the given ID was not found.')
  res.send(course);
});

router.get('/api/posts/:year/:month', function(req, res) {
  res.send([req.params,req.query]);
});

router.post('/api/courses', function(req, res) {
  const { error } = validateCourse(req.body);

 if(error) return res.status(400).send(error.details[0].message);
  const course={
    id: courses.length+1 ,
    name: req.body.name
  }
  courses.push(course);
  res.send(courses);
});

router.put('/api/courses/:id',(req, res)=>{
  const course = courses.find(c=> c.id === parseInt(req.params.id) );
  if(!course) return res.status(404).send('The course with the given ID was not found.')

  const { error } = validateCourse(req.body);  

 if(error) return res.status(400).send(error.details[0].message);

  course.name= req.body.name;
  res.send(course);
});

router.delete('/api/courses/:id',(req, res)=>{
  const course = courses.find(c=> c.id === parseInt(req.params.id) );
  if(!course) return res.status(404).send('The course with the given ID was not found.')
  const index = courses.indexOf(course);
  courses.splice(index,1);
  res.send(course);
});


function validateCourse(course){
  const schema ={
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course,schema);
}

module.exports = router;
