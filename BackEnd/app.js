const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const jwt= require('jsonwebtoken')
const Coursedata = require('./src/modal/CourseData');
const CourseRegistrationdata = require('./src/modal/CourseRegistrationData');
const Testimonialdata = require('./src/modal/TestimonialData');


const app = new express();
app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(bodyparser.json())

const port = process.env.PORT || 5000;

function verifyToken(req, res, next) {
    // if(!req.headers.authorization) {
    //   return res.status(401).send('Unauthorized request')
    // }
    // let token = req.headers.authorization.split(' ')[1]
    // if(token === 'null') {
    //   return res.status(401).send('Unauthorized request')    
    // }
    // let payload = jwt.verify(token, 'secretKey')
    // if(!payload) {
    //   return res.status(401).send('Unauthorized request')    
    // }
    // req.userId = payload.subject
    next()
  }

app.get('/CourseList',function(req,res){
    Coursedata.find().sort({ index: 1 })
    .then(function(courses){
        res.send(courses);
        });
});

app.get('/Course/:id',  (req, res) => {  
    const id = req.params.id;
    Coursedata.findOne({"_id":id})
      .then((course)=>{
        console.log(` retrieved author ${course.course_title}`);
          res.send(course);
      });
  })

  app.get('/CourseTestimony/:id',  (req, res) => {        
    const id = req.params.id;
    Testimonialdata.find({"course_id":id})
      .then((testimonials)=>{
          res.send(testimonials);
      });
  })


app.get('/CourseCategory',function(req,res){
    Coursedata.find().sort({ Reg_Status : -1 })
    .then(function(courses){
        res.send(courses);
        });
});

app.post('/registercourse',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH,PUT,DELETE,OPTIONS'); 
    var RegistrationItem = {
        course_id     : req.body.course_id,
        course_title  : req.body.course_title,
        firstname     : req.body.firstname,
        lastname      : req.body.lastname,
        emailaddress  : req.body.emailaddress,
        phoneno       : req.body.phoneno,
        employed      : req.body.employed,
        graduation    : req.body.graduation,
        message       : req.body.message
    }
    // var vUser= CourseRegistrationdata(RegistrationItem);
    // vUser.save();
    // console.log(`The registered user added is : Email ID - ${RegistrationItem.emailaddress}, Course - ${RegistrationItem.course_title}`);
    // res.status(200).send({ RegistrationItem});

    CourseRegistrationdata.find({'emailaddress' :  RegistrationItem.emailaddress, 'course_id' :  RegistrationItem.course_id})
    .then (function(cousrseReg){
            var bexist=false;
            console.log(`fetched from db Email ID - ${RegistrationItem.emailaddress}, coursetitle - ${RegistrationItem.course_title}`)
            for(var i=0; i<cousrseReg.length; i++){
            if ((cousrseReg[i].emailaddress==RegistrationItem.emailaddress) && (cousrseReg[i].course_id==RegistrationItem.course_id)) {
                bexist=true;
            }};
            if (bexist){
                console.log(`Email ID is already registered for the course ${RegistrationItem.course_title}`);
                res.status(401).send(`Email ID is already registered for the course ${RegistrationItem.course_title}`)
               }  
            else{
                var vUser= CourseRegistrationdata(RegistrationItem);
                vUser.save();
                console.log(`The registered user added is : Email ID - ${RegistrationItem.emailaddress}, Course - ${RegistrationItem.course_title}`);
                res.status(200).send({ RegistrationItem})
            }
    });
  });

  app.put('/Course/updateIndex',verifyToken,(req,res)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH,PUT,DELETE,OPTIONS');     
    
    id         = req.body._id;
    title      = req.body.course_title;
    index      = req.body.index;
    console.log(`update of ${title} with value ${index}`);
    Coursedata.findByIdAndUpdate({"_id":id},
                                {$set:{"index":index}})
   .then(function(){
       res.send();
   })

  });



app.listen(5000, function(){
    console.log('listening to port 5000');
});